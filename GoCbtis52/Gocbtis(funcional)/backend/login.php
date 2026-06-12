<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->correo) && !empty($data->password)) {
    
    // Buscar la fila completa usando solo el correo
    $query = "SELECT id, nombre, correo, edad, password_hash FROM usuarios WHERE correo = :correo LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':correo', $data->correo);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        // Si el usuario existe
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $password_hash = $row['password_hash'];
        $edad_registrada = $row['edad'];

        // Verificar contraste de encriptación de hash
        if(password_verify($data->password, $password_hash)){
            echo json_encode(array(
                "success" => true,
                "message" => "Inicio de sesión exitoso.",
                "data" => array(
                    "id" => $row['id'],
                    "nombre" => $row['nombre'],
                    "correo" => $row['correo'],
                    "edad" => $edad_registrada
                )
            ));
        } else {
            // Contraseña mal introducida
            echo json_encode(array("success" => false, "message" => "Contraseña incorrecta. Por favor, inténtalo de nuevo."));
        }
    } else {
         // Correo no existe en la base de datos
         echo json_encode(array("success" => false, "message" => "Correo no encontrado en la Base de Datos MySQL. Regístrate primero."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Se requiere correo y contraseña para validar."));
}
?>
