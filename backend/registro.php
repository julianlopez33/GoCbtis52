<?php
// Permitir conexiones web locales
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once 'conexion.php';

// Obtener la información del Javascript (fetch)
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->nombre) &&
    !empty($data->correo) &&
    !empty($data->edad) &&
    !empty($data->password)
){
    // 1. Revisar si el correo electrónico ya existe registrado
    $check_query = "SELECT id FROM usuarios WHERE correo = :correo LIMIT 1";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bindParam(':correo', $data->correo);
    $check_stmt->execute();
    
    if($check_stmt->rowCount() > 0) {
        // Enviar repuesta negativa
        echo json_encode(array("success" => false, "message" => "El correo electrónico ya se encuentra registrado. Usa otro o inicia sesión."));
        exit();
    }

    // 2. Si no existe, crear la cuenta y cifrar la contraseña
    $query = "INSERT INTO usuarios (nombre, correo, edad, password_hash) VALUES (:nombre, :correo, :edad, :password)";
    $stmt = $conn->prepare($query);

    // Hash the password securely usando Bcrypt moderno de PHP
    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);

    $stmt->bindParam(':nombre', $data->nombre);
    $stmt->bindParam(':correo', $data->correo);
    $stmt->bindParam(':edad', $data->edad);
    $stmt->bindParam(':password', $password_hash);

    if($stmt->execute()){
        echo json_encode(array("success" => true, "message" => "¡Cuenta creada exitosamente en la base de datos MySQL!"));
    } else{
        echo json_encode(array("success" => false, "message" => "No se pudo crear la cuenta por un error de escritura."));
    }
} else{
    echo json_encode(array("success" => false, "message" => "Datos incompletos enviados al servidor."));
}
?>
