<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pase de Lista con QR</title>

  <!-- Librería para leer códigos QR desde la cámara -->
  <script src="https://unpkg.com/html5-qrcode"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f4f4f4;
      padding: 20px;
    }
    #reader {
      width: 300px;
      margin: auto;
    }
    img {
      width: 150px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h2>📷 Escanea tu código QR para entrar a la asignatura</h2>
  <div id="reader"></div>
  <p>O muestra este QR:</p>
  <img src="A_QR_code_in_the_image_is_a_two-dimensional_matrix.png" alt="QR Operaciones de Química">

  <script>
    // Contraseñas por asignatura
    const contraseñas = {
      "Operaciones de química": "CRISTINA",
      "IPE": "1234",
      "Microbiología": "5678",
      "Ensayos de materiales": "ABCD",
      "Principios de ensayos electromecánicos": "EFGH",
      "Análisis legionella": "LMNO"
    };

    // Alumnos de ejemplo
    const alumnos = ["Alma", "Javier", "Maria", "Isabel", "Paola"];

    // Iniciar lector QR
    function onScanSuccess(decodedText) {
      alert("Asignatura detectada: " + decodedText);

      if (!contraseñas[decodedText]) {
        alert("⚠️ Asignatura no reconocida.");
        return;
      }

      const pass = prompt("Introduce la contraseña para " + decodedText + ":");
      if (pass === contraseñas[decodedText]) {
        alert("✅ Acceso concedido a " + decodedText);

        const registro = {};
        let continuar = "sí";

        while (continuar.toLowerCase() === "sí" || continuar.toLowerCase() === "si") {
          let nombre = prompt("👤 Introduce tu nombre:");
          if (!alumnos.includes(nombre)) {
            alert("⚠️ Alumno no encontrado.");
          } else {
            let estado = prompt(`Estado de ${nombre}:\n1. Presente\n2. Retraso\n3. Ausente`);
            switch (estado) {
              case "1": registro[nombre] = "Presente"; break;
              case "2": registro[nombre] = "Retraso"; break;
              case "3": registro[nombre] = "Ausente"; break;
              default: registro[nombre] = "Sin marcar";
            }
            alert(`✅ ${nombre}: ${registro[nombre]}`);
          }
          continuar = prompt("¿Hay otro alumno? (sí/no)");
        }

        console.log("📋 Registro final:");
        console.log(registro);
      } else {
        alert("❌ Contraseña incorrecta.");
      }
    }

    // Crear lector en pantalla
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    ).catch(err => {
      console.error("Error al iniciar cámara:", err);
    });
  </script>
</body>
</html>