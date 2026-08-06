/* ============================================================
   CONFIG.JS
   Acá va todo lo que el profe tiene que ir actualizando.
   Por ahora son datos de EJEMPLO para probar la app.
   Más adelante lo migramos a un Excel embebido, igual que en
   la app de Tigre (datos.xlsx + SheetJS).
   ============================================================ */

// 1) URL del Google Apps Script (backend para RPE).
//    Se completa cuando despleguemos el script de Google Sheets.
//    Instrucciones en apps-script/INSTRUCCIONES.md
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTtAJs1MDOMoceDODzDFoCbd_IKHdhOn6MEiKr3vBtR2_UW4U1opQs4n1hUtVvTJkj/exec";

// 2) Lista de alumnos
const ALUMNOS = [
  "Demo (probar la app)",
  "Eric Tomanovich",
  "Sebastián Muratore",
  "Ezequiel Fasciolo",
  "Barbara Lauriente",
  "Germán Muratore",
  "Romano Copello",
  "Juan Lauriente",
  "Josefina Pellejero",
  "Juan Ignacio Giancarli",
  "Johana Araujo",
  "Elio Acevedo",
  "Valeria Blois",
  "Natalia Sanchez",
  "Rocio Duchi",
  "Candela Stamadianos",
  "Mario Flores",
  "Nancy Noguera"
];

// 2.1) PIN de 4 dígitos por alumno — se lo pasás vos a cada uno (por
//      WhatsApp, por ejemplo). Sin el PIN correcto no pueden entrar a
//      ver la rutina, ni la suya ni la de otro compañero.
const PINS = {
  "Demo (probar la app)": "0000",
  "Eric Tomanovich": "0001",
  "Sebastián Muratore": "2824",
  "Ezequiel Fasciolo": "1409",
  "Barbara Lauriente": "5506",
  "Germán Muratore": "5012",
  "Romano Copello": "4657",
  "Juan Lauriente": "3286",
  "Josefina Pellejero": "2679",
  "Juan Ignacio Giancarli": "9935",
  "Johana Araujo": "2424",
  "Elio Acevedo": "7912",
  "Valeria Blois": "1520",
  "Natalia Sanchez": "1488",
  "Rocio Duchi": "2535",
  "Candela Stamadianos": "4582",
  "Mario Flores": "4811",
  "Nancy Noguera": "9279"
};

// 3) Rutinas por alumno, organizadas por SEMANA
//    Ahora se leen directamente del archivo rutinas.xlsx (una pestaña por
//    alumno) — no hace falta tocar este archivo para actualizar rutinas.
//    Ver rutinas.xlsx (pestaña LEEME) para las instrucciones de formato.
//    "RUTINAS" se completa solo al cargar la app (ver app.js).
let RUTINAS = {};

// Orden fijo de categorías (no tocar el orden de este array)
const CATEGORIAS_ORDEN = ["Entrada en calor", "Potencia", "Fuerza", "Core", "Cardio"];
// Alumnos sin rutina cargada todavía usan este mensaje:
const RUTINA_DEFAULT = {};

// 4) Tests físicos: historial por alumno y por tipo de test
//    Cada entrada: { fecha: "YYYY-MM-DD", valor: número }
//    Todavía sin cargar — se completa a medida que el profe pasa los tests.
const TESTS = {
  "Demo (probar la app)": {
    "Salto CMJ (cm)": [
      { fecha: "2026-06-01", valor: 34 },
      { fecha: "2026-07-01", valor: 37 },
      { fecha: "2026-08-01", valor: 39 }
    ]
  }
};

// 5) Video-biblioteca (compartida para todos los alumnos)
const VIDEOS = [
  { titulo: "Bear crawl static", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=aN0RkNxtrWA&list=UUTr6ksZa-Omw10sOpij44dw&index=64" },
  { titulo: "Bird dog dinamic", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=lit0rQx-pFo&list=UUTr6ksZa-Omw10sOpij44dw&index=63" },
  { titulo: "Bird dog static", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=TkEyX1Ddllc&list=UUTr6ksZa-Omw10sOpij44dw&index=62" },
  { titulo: "Bug dead alternado", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=QvOYL3rvtAU&list=UUTr6ksZa-Omw10sOpij44dw" },
  { titulo: "Bug dead", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=Y2_bvgItVCY&list=UUTr6ksZa-Omw10sOpij44dw&index=55" },
  { titulo: "Copenhague", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=Qf--Sruf4I8&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Crunches", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=gmbCnka44kM" },
  { titulo: "Doble mountain climbers (DMC)", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=6VarhoVXkG4&list=UUTr6ksZa-Omw10sOpij44dw&index=72&t=0s" },
  { titulo: "Espinales", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=hy2_t4158dE&list=UUTr6ksZa-Omw10sOpij44dw&index=76&t=0s" },
  { titulo: "Hollow hold", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=uvyFLSMPmnM&list=UUTr6ksZa-Omw10sOpij44dw&index=57" },
  { titulo: "Hollow rocks", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=vjq-oIUek04&list=UUTr6ksZa-Omw10sOpij44dw&index=58" },
  { titulo: "Mountain climbers", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=Zyj6vBZ0Ij0&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Plank", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=pjXtvqIkhSg&list=UUTr6ksZa-Omw10sOpij44dw&index=71&t=0s" },
  { titulo: "Plank aductor", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=kI_0v6p_ue0&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Plank get up", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=s-BskpTHdfM&list=UUTr6ksZa-Omw10sOpij44dw&index=65" },
  { titulo: "Plank lateral", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=dARJv_q3yao&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Plank + rotación", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=x743qHZdVOc&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Plank touch", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=MG8uGlInAIc&list=UUTr6ksZa-Omw10sOpij44dw&index=66" },
  { titulo: "Russian twist", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=Lh1Rlem9mfo&list=UUTr6ksZa-Omw10sOpij44dw&index=61" },
  { titulo: "Toco talones", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=UF3NtJV-7rs&list=UUTr6ksZa-Omw10sOpij44dw&index=87&t=0s" },
  { titulo: "Tuck up", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=5osPjy8rXF8&list=UUTr6ksZa-Omw10sOpij44dw&index=59" },
  { titulo: "V ups", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=IfS-V0e5gPY&list=UUTr6ksZa-Omw10sOpij44dw&index=60" },
  { titulo: "Walk out", grupo: "CORE – ZONA MEDIA", url: "https://www.youtube.com/watch?v=ICUKTzO8ia4&list=UUTr6ksZa-Omw10sOpij44dw&index=75&t=0s" },
  { titulo: "Air squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=Lcn-KX0JzJo&list=UUTr6ksZa-Omw10sOpij44dw&index=37" },
  { titulo: "Back lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=M5DT0i8fYww&list=UUTr6ksZa-Omw10sOpij44dw&index=69" },
  { titulo: "Back squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=RErOzHxnUqk&list=UUTr6ksZa-Omw10sOpij44dw&index=67" },
  { titulo: "Bisagras de cadera", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=sq7wOOqVRGM&list=UUTr6ksZa-Omw10sOpij44dw&index=20" },
  { titulo: "Box hipthrust", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=IKB0s2mAAkg&list=UUTr6ksZa-Omw10sOpij44dw&index=88&t=0s" },
  { titulo: "Box Pistols", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=zrMhocUix1Y&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Box step up crossover", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=292O7wojmu0&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Box step up", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=ocBE0INzj4k&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Bulgarian Split squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=MrPrmQD9qvE&list=UUTr6ksZa-Omw10sOpij44dw&index=50" },
  { titulo: "Crossover Lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=wfohkshe0OI&list=UUTr6ksZa-Omw10sOpij44dw&index=85&t=0s" },
  { titulo: "Dead lift cabra", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=BEig2l4SgoY&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Dead lift", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=-IIilut29tM&list=UUTr6ksZa-Omw10sOpij44dw&index=71" },
  { titulo: "Deck Squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=ZHbbJCWH-58&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Elevacion de gemelos", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=OOHu-aTU9XI&list=UUTr6ksZa-Omw10sOpij44dw&index=96&t=0s" },
  { titulo: "Frog pump", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=vMz5HR4RvM4&list=UUTr6ksZa-Omw10sOpij44dw&index=36&t=0s" },
  { titulo: "Front squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=drUCVplgfGA&list=UUTr6ksZa-Omw10sOpij44dw&index=68" },
  { titulo: "Goblet lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=zdlq_2vBlas&list=UUTr6ksZa-Omw10sOpij44dw&index=78" },
  { titulo: "Goblet Squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=vD4bfQRjajA&list=UUTr6ksZa-Omw10sOpij44dw&index=77" },
  { titulo: "Good morning", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=iuiyllMI9J0&list=UUTr6ksZa-Omw10sOpij44dw&index=83&t=0s" },
  { titulo: "Hand to hand (h2h)", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=UVGb8nQ5zSw&list=UUTr6ksZa-Omw10sOpij44dw&index=79" },
  { titulo: "Hip hold", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=FnbJ2gWpbnY&list=UUTr6ksZa-Omw10sOpij44dw&index=73" },
  { titulo: "Hip hold one leg", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=RYZyy3T4jnc&list=UUTr6ksZa-Omw10sOpij44dw&index=74" },
  { titulo: "Hipthrust one leg", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=1u81QYbFTUI&list=UUTr6ksZa-Omw10sOpij44dw&index=75" },
  { titulo: "Hipthrust", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=GBuHE-NajyM&list=UUTr6ksZa-Omw10sOpij44dw&index=76" },
  { titulo: "Isquio slider one leg", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=05lBJCQIlsI&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Isquios slider", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=SzvCJe7HNYw&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Lateral lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=kJydqNZdX30&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Lunges jump", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=0eCsvKU0f5Q&list=UUTr6ksZa-Omw10sOpij44dw&index=41" },
  { titulo: "Lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=k3pkf4DjhmQ&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Lunges + rotación", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=hBuQoI07CfU&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Monster walk", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=FE73QfUIHss&list=UUTr6ksZa-Omw10sOpij44dw&index=93&t=0s" },
  { titulo: "Oh lunges one arm", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=xMJx1E28S44&list=UUTr6ksZa-Omw10sOpij44dw&index=62&t=0s" },
  { titulo: "Oh squats one arm", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=rCUfmUMZNiA" },
  { titulo: "Oh squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=qmolGQ17syQ&list=UUTr6ksZa-Omw10sOpij44dw&index=21" },
  { titulo: "Russian swing", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=xuzwp9ax5yg&list=UUTr6ksZa-Omw10sOpij44dw&index=78" },
  { titulo: "Reverse lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=cmXDC1uzX0s&list=UUTr6ksZa-Omw10sOpij44dw&index=42" },
  { titulo: "Sumo dead lift high pull (SDLHP)", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=eR2FRmDk1Ao&list=UUTr6ksZa-Omw10sOpij44dw&index=67&t=0s" },
  { titulo: "Shake squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=1YgQlLN9v2g&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Sissy squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=zlVZu7uEV1I&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Skater squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=qs0H2s2DRq4&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "SLDL tutor", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=DBf1HRYpCW8&list=UUTr6ksZa-Omw10sOpij44dw&index=31" },
  { titulo: "Single leg dead lift (SLDL)", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=78jTJQul0mg&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Slide squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=EiojNCQMiZ4" },
  { titulo: "Squat hold", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=uV542Ka50wU&list=UUTr6ksZa-Omw10sOpij44dw&index=40" },
  { titulo: "Squat jump", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=LdY-SFAYX7E&list=UUTr6ksZa-Omw10sOpij44dw&index=38" },
  { titulo: "Squat move", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=M8VG8KosU50&list=UUTr6ksZa-Omw10sOpij44dw&index=86&t=0s" },
  { titulo: "Squat pulse", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=6AX9acgLva8&list=UUTr6ksZa-Omw10sOpij44dw&index=82" },
  { titulo: "Squat pulse to over head", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=64nvoF_F3k0&list=UUTr6ksZa-Omw10sOpij44dw&index=90&t=0s" },
  { titulo: "Static lunges", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=0WjWerBv6m0&list=UUTr6ksZa-Omw10sOpij44dw&index=43" },
  { titulo: "Sumo dead lift", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=NK_rJhUJgjk&list=UUTr6ksZa-Omw10sOpij44dw&index=72" },
  { titulo: "Sumo squats", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=Z6woMdaE9VU&list=UUTr6ksZa-Omw10sOpij44dw&index=39" },
  { titulo: "Thruster", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=0uLPwTuODoo&list=UUTr6ksZa-Omw10sOpij44dw&index=73&t=0s" },
  { titulo: "Vitalizaciones", grupo: "Rodilla y Cadera Dominante (Tren inferior)", url: "https://www.youtube.com/watch?v=VoRIGjuIKus&list=UUTr6ksZa-Omw10sOpij44dw&index=64&t=0s" },
  { titulo: "Aperturas", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=wUBdqJUu3fQ" },
  { titulo: "Bench press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=xJressNbxFY&list=UUTr6ksZa-Omw10sOpij44dw&index=70&t=0s" },
  { titulo: "BHT", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=0t_zkalyuHE&list=UUTr6ksZa-Omw10sOpij44dw&index=80&t=0s" },
  { titulo: "Box dips", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=12XOtDKBA1c&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Curl 21", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=dBSdZ_yaqjg&list=UUTr6ksZa-Omw10sOpij44dw&index=65&t=0s" },
  { titulo: "Curl alternado", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=xxRB4vwedxE&list=UUTr6ksZa-Omw10sOpij44dw&index=91&t=0s" },
  { titulo: "Curl barra", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=3gmqOD409vk&list=UUTr6ksZa-Omw10sOpij44dw&index=66&t=0s" },
  { titulo: "Curl bíceps", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=SbvhjEzAsys&list=UUTr6ksZa-Omw10sOpij44dw&index=92&t=0s" },
  { titulo: "Db Shoulder press alternado", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=EA9qP0lJkIk" },
  { titulo: "Floor press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=nMyVwXDdzVg&list=UUTr6ksZa-Omw10sOpij44dw&index=139" },
  { titulo: "Kb Shoulder press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=xNIPkSGYQFs&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Lunges press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=QdT4SHwgC64&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Patada de burro tríceps", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=Z1GKBHqOQUw&list=UUTr6ksZa-Omw10sOpij44dw&index=68&t=0s" },
  { titulo: "Push ups", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=DBopFNHeKxc" },
  { titulo: "Push ups inclinado", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=gnlxvhmkX_4" },
  { titulo: "Push ups declined", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=tQNWTqtfNrM" },
  { titulo: "Press arnold", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=CzRluLgPPfE&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Press francés one arm", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=LT8eBRIhMWo" },
  { titulo: "Press francés", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=seC2JQ47fhg&list=UUTr6ksZa-Omw10sOpij44dw&index=69&t=0s" },
  { titulo: "Push press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=FKZmttE9JaM&list=UUTr6ksZa-Omw10sOpij44dw&index=77&t=0s" },
  { titulo: "Row 45°", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=vNuq3q7GxMU&list=UUTr6ksZa-Omw10sOpij44dw&index=2" },
  { titulo: "Row 90°", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=5_sRr5ap0dw&list=UUTr6ksZa-Omw10sOpij44dw" },
  { titulo: "Serrucho", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=u3Tq3bgpbJU&list=UUTr6ksZa-Omw10sOpij44dw&index=1" },
  { titulo: "Shoulder press alternado", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=EA9qP0lJkIk&list=UUTr6ksZa-Omw10sOpij44dw&index=79&t=0s" },
  { titulo: "Shoulder press", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=YkE8CBNAnP0&list=UUTr6ksZa-Omw10sOpij44dw&index=70" },
  { titulo: "Vuelos frontales", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=kJ58caS_26Q&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Vuelos laterales", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=VeXt9M9G3Jw&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Vuelos posteriores", grupo: "Empuje y Tracción (Tren superior)", url: "https://www.youtube.com/watch?v=AYAs-au7fd8&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "50-50", grupo: "Mobility", url: "https://www.youtube.com/watch?v=G2GIFyItJF4&list=UUTr6ksZa-Omw10sOpij44dw&index=26" },
  { titulo: "90-90 extensive", grupo: "Mobility", url: "https://www.youtube.com/watch?v=O0G3p4g6alA&list=UUTr6ksZa-Omw10sOpij44dw&index=28" },
  { titulo: "90-90", grupo: "Mobility", url: "https://www.youtube.com/watch?v=dFig0Ar4FA8&list=UUTr6ksZa-Omw10sOpij44dw&index=27" },
  { titulo: "Abduccion 0°", grupo: "Mobility", url: "https://www.youtube.com/watch?v=qKepuQFubBk&list=UUTr6ksZa-Omw10sOpij44dw&index=98&t=0s" },
  { titulo: "Abduccion 90°", grupo: "Mobility", url: "https://www.youtube.com/watch?v=51ZVfP99vO4&list=UUTr6ksZa-Omw10sOpij44dw&index=99&t=0s" },
  { titulo: "Abduccion hombros", grupo: "Mobility", url: "https://www.youtube.com/watch?v=xIuMDglMfkg&list=UUTr6ksZa-Omw10sOpij44dw&index=96" },
  { titulo: "Back rock dinamico", grupo: "Mobility", url: "https://www.youtube.com/watch?v=EXpxxLSVfK4&list=UUTr6ksZa-Omw10sOpij44dw&index=24" },
  { titulo: "Bretzel", grupo: "Mobility", url: "https://www.youtube.com/watch?v=BIsw9r8Qe64" },
  { titulo: "Caminata rusa", grupo: "Mobility", url: "https://www.youtube.com/watch?v=_KpXAmdM0hw&list=UUTr6ksZa-Omw10sOpij44dw&index=74&t=0s" },
  { titulo: "Dorsiflex", grupo: "Mobility", url: "https://www.youtube.com/watch?v=L5_RZrTju9M&list=UUTr6ksZa-Omw10sOpij44dw&index=22" },
  { titulo: "Gluteo", grupo: "Mobility", url: "https://www.youtube.com/watch?v=h6dTL83aUF0&list=UUTr6ksZa-Omw10sOpij44dw&index=25" },
  { titulo: "Halo", grupo: "Mobility", url: "https://www.youtube.com/watch?v=Zr-gbqzHM80&list=UUTr6ksZa-Omw10sOpij44dw&index=63&t=0s" },
  { titulo: "Isquios dinamico", grupo: "Mobility", url: "https://www.youtube.com/watch?v=hrxf_njJiy0&list=UUTr6ksZa-Omw10sOpij44dw&index=30" },
  { titulo: "Isquios touch and go", grupo: "Mobility", url: "https://www.youtube.com/watch?v=uyF8Rk0os2s&list=UUTr6ksZa-Omw10sOpij44dw&index=29" },
  { titulo: "Lunges halo", grupo: "Mobility", url: "https://www.youtube.com/watch?v=4V2lAGfZByI&list=UUTr6ksZa-Omw10sOpij44dw&index=89&t=0s" },
  { titulo: "Movilidad escapular", grupo: "Mobility", url: "https://www.youtube.com/watch?v=WkXAeBnU-0o&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Movilidad torácica", grupo: "Mobility", url: "https://www.youtube.com/watch?v=a6mZuM2zljI&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Movilididad de rotadores", grupo: "Mobility", url: "https://www.youtube.com/watch?v=Q8b9mwzTaQs&list=UUTr6ksZa-Omw10sOpij44dw&index=84&t=0s" },
  { titulo: "Movilidad de serratos", grupo: "Mobility", url: "https://www.youtube.com/watch?v=aKkcdD0l0so&list=UUTr6ksZa-Omw10sOpij44dw&index=100&t=0s" },
  { titulo: "Psoas dinamico", grupo: "Mobility", url: "https://www.youtube.com/watch?v=6yVGL6yKnd0&list=UUTr6ksZa-Omw10sOpij44dw&index=23" },
  { titulo: "Rotacion externa", grupo: "Mobility", url: "https://www.youtube.com/watch?v=0RDffEzdKH8&list=UUTr6ksZa-Omw10sOpij44dw&index=19" },
  { titulo: "Rotaciones", grupo: "Mobility", url: "https://www.youtube.com/watch?v=PTheYgNcDxA&list=UUTr6ksZa-Omw10sOpij44dw&index=17" },
  { titulo: "Rotaciones (tipo 2)", grupo: "Mobility", url: "https://www.youtube.com/watch?v=isDh5tlWuAc&list=UUTr6ksZa-Omw10sOpij44dw&index=18" },
  { titulo: "Rotadores con banda", grupo: "Mobility", url: "https://www.youtube.com/watch?v=3XdGa_qDiNY&list=UUTr6ksZa-Omw10sOpij44dw&index=101&t=0s" },
  { titulo: "Athletic Burpees", grupo: "Cardio", url: "https://www.youtube.com/watch?v=zSBt0ykJiXE&list=UUTr6ksZa-Omw10sOpij44dw&index=78" },
  { titulo: "Burpees", grupo: "Cardio", url: "https://www.youtube.com/watch?v=EYA7P7M2Shc" },
  { titulo: "Jumping jacks stick", grupo: "Cardio", url: "https://www.youtube.com/watch?v=_a9H4lTUI8Q" },
  { titulo: "Jumping Jacks", grupo: "Cardio", url: "https://www.youtube.com/watch?v=cC5ArtjZmDo" },
  { titulo: "Sprawls", grupo: "Cardio", url: "https://www.youtube.com/watch?v=6inQAr8ZMqg" },
  { titulo: "Ocho", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=vbo5X7g4yBw&list=UUTr6ksZa-Omw10sOpij44dw&index=108&t=0s" },
  { titulo: "Skipping A", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=cIIsB7rNq3o" },
  { titulo: "Skipping B", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=RJUnKLAN47M" },
  { titulo: "Skipping lateral conos", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=n251SlfW8NQ" },
  { titulo: "Stick jump lateral", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=FOkj_Ui9BB0" },
  { titulo: "Stick salto tijera", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=72GItnEmcf4&list=UUTr6ksZa-Omw10sOpij44dw&index=12" },
  { titulo: "Stick skipping frontal", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=fJmQ1fg_cP8&list=UUTr6ksZa-Omw10sOpij44dw&index=13" },
  { titulo: "Stick skipping lateral", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=Ucut1Htu5x0" },
  { titulo: "Stick skipping + salto lateral", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=68kwqJJxOrc&list=UUTr6ksZa-Omw10sOpij44dw&index=44" },
  { titulo: "Traslado en V + gesto técnico cabezazo", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=ygTFLAoFxsQ&list=UUTr6ksZa-Omw10sOpij44dw&index=16" },
  { titulo: "Traslado en V", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=ate9PZbUo5c&list=UUTr6ksZa-Omw10sOpij44dw&index=15" },
  { titulo: "Traslado frontal + skipping lateral", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=pXswGG9MsQc&list=UUTr6ksZa-Omw10sOpij44dw&index=47" },
  { titulo: "Traslado frontal", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=0ulShySME10&list=UUTr6ksZa-Omw10sOpij44dw&index=46" },
  { titulo: "Traslado + rodeo", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=k9cadwu64UE&list=UUTr6ksZa-Omw10sOpij44dw&index=48" },
  { titulo: "Traslado + salto + velocidad", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=WxmDVb00KxQ&list=UUTr6ksZa-Omw10sOpij44dw&index=49" },
  { titulo: "Traslados laterales", grupo: "Coordinacion y traslados", url: "https://www.youtube.com/watch?v=kgHqInAJX_8&list=UUTr6ksZa-Omw10sOpij44dw&index=45" },
  { titulo: "Estrella", grupo: "Preventivos", url: "https://www.youtube.com/watch?v=CNlgxiMb6hc&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Paloma", grupo: "Preventivos", url: "https://www.youtube.com/watch?v=mEJQGhhgvk8&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Salto y caigo", grupo: "Preventivos", url: "https://www.youtube.com/watch?v=jmdaxHNMHcU&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Sentadilla monopodal", grupo: "Preventivos", url: "https://www.youtube.com/watch?v=Cnu9TRrlKuY&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
  { titulo: "Broad jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=idFbNDTQDfA&list=UUTr6ksZa-Omw10sOpij44dw&index=34" },
  { titulo: "Bulgarian Split jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=187OqYDiQAU&list=UUTr6ksZa-Omw10sOpij44dw&index=51" },
  { titulo: "Counter movement jump (CMJ)", grupo: "Potencia", url: "https://www.youtube.com/watch?v=BLg6UE8RCfs&list=UUTr6ksZa-Omw10sOpij44dw&index=32" },
  { titulo: "Drop jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=idFbNDTQDfA&list=UUTr6ksZa-Omw10sOpij44dw&index=34" },
  { titulo: "Drop + broad jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=cPxY02daPwc&list=UUTr6ksZa-Omw10sOpij44dw&index=35" },
  { titulo: "Drop + cmj + broad jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=_C-u-6PKgDA&list=UUTr6ksZa-Omw10sOpij44dw&index=36" },
  { titulo: "Drop + cmj", grupo: "Potencia", url: "https://www.youtube.com/watch?v=MtZVn5rYNsQ&list=UUTr6ksZa-Omw10sOpij44dw&index=33" },
  { titulo: "Knees jump", grupo: "Potencia", url: "https://www.youtube.com/watch?v=3H-uZf0U0Uw&list=UUTr6ksZa-Omw10sOpij44dw&index=81" },
];

const METODOS_ENTRENAMIENTO = [
  { nombre: "Amrap", descripcion: "Es una sigla en inglés que significa “As Many Reps/Rounds As Possible” (Máximas repeticiones o rondas posibles). Es decir que si tienes por ejemplo un Amrap de 5’ de 10 Air squats, 10 push ups y 10 crunches, lo que tendrás que hacer es repetir esos ejercicios la mayor cantidad de veces que puedas dentro de los 5’." },
  { nombre: "Chipper", descripcion: "En el Chipper, tienes que realizar las repeticiones del ejercicio que primero se encuentra, y hasta que no lo termines no puedes pasar la siguiente. Eso sí, cada ejercicio lo harás solamente una vez. En el caso de que tengas un chipper de 50 Air squats, 50 V ups y 50 Plank get up, lo que deberás hacer es: Primero las 50 sentadillas, una vez que finalizas, haces los 50 Abs v ups, y una vez que los terminas, haces los 50 Plank get up." },
  { nombre: "Emom", descripcion: "Esta sigla en inglés (Every Minute On the Minute) significa \"cada minuto en el minuto\". Este tipo de entrenamiento consiste en realizar un número determinado de repeticiones dentro de un minuto. Por lo tanto, si tienes un EMOM de 5’ de 20 Squat jump, lo que tendrás que hacer es realizar dentro de cada minuto las 20 Sentadillas con salto. Lo que sobre del minuto lo utilizarás para descansar, y cuando vuelva a comenzar el siguiente minuto, repetirás la secuencia. Así hasta completar los 5’." },
  { nombre: "OTM", descripcion: "De la sigla en inglés “ON THE MINUTE” es muy similar al EMOM, nada más que en este caso, se realizarán distintos ejercicios en cada minuto, por ejemplo, si tienes un OTM de 9’ con en el 1° minuto 20 Push ups, en el 2° minuto 20 Hollow rocks y en el 3° minuto 20 Lunges, harás en el primer minuto las 20 flexiones de brazo y lo que te sobre de tiempo descansarás. En el minuto 2, los 20 hollow rocks y lo que sobre del minuto lo descansarás. En el minuto 3, las 20 estocadas y lo que sobre del minuto lo descansarás. Y cuando comience el  4to minuto volverás a comenzar por el ejercicio del 1er minuto. Así con los tres ejercicios hasta completar los 9’." },
  { nombre: "Tabata", descripcion: "En el tabata, tendrás determinado tu tiempo de trabajo asi como también el de descanso. Suponiendo que tienes un tabata de 40’’x20’’x5’, realizarás 40’’ de trabajo del ejercicio que se haya indicado, 20’’ descansarás, y repetirás hasta llegar a los 5’." },
];

// 6) Perfil del profe: foto y carta de presentación
//    "foto": pegá el nombre de archivo de tu foto (ej: "eric.jpg"), subiéndola
//    a la carpeta pwa/ junto a index.html. Dejalo vacío ("") si todavía no la tenés.
//    "bio": separá los párrafos con una línea en blanco.
const PERFIL = {
  foto: "foto-perfil.jpg",
  instagram: "https://www.instagram.com/profe.eric",
  bio: `El entrenamiento Online surge como respuesta a la necesidad de encontrar un servicio acorde a tus características, tus posibilidades y tus objetivos. Soy un agente de salud y por esta razón, estoy para ayudarte a que consigas resultados reales que perduren en el tiempo.

Por tal motivo, estaré disponible y aprendiendo sobre vos, creando, diseñando y adaptando planes que se ajusten a tus necesidades.

Gracias por elegirme y confiar en mí, Eric.`
};

// 7) Preguntas frecuentes — todavía sin cargar, la sección aparece vacía
const FAQ = [];

// 8) Ejercicios habilitados para que el alumno registre su propio test de
//    fuerza (1RM) desde la pestaña "%RM". El resultado queda guardado en
//    "Tests" del alumno automáticamente.
const EJERCICIOS_RM = [
  "Bench Press",
  "Back Squats",
  "Hipthrust",
  "Shoulder Press",
  "Pull Ups",
  "Dead lift"
];

// 9) Fichas por patrón de movimiento (PDFs). El "archivo" es el nombre
//    del PDF puesto adentro de la carpeta pwa/fichas/ (subida junto con
//    el resto de la app).
const FICHAS = [
  { patron: "Cadera Dominante", archivo: "fichas/cadera-dominante.pdf" },
  { patron: "Rodilla Dominante", archivo: "fichas/rodilla-dominante.pdf" },
  { patron: "Empuje Horizontal", archivo: "fichas/empuje-horizontal.pdf" },
  { patron: "Empuje Vertical", archivo: "fichas/empuje-vertical.pdf" },
  { patron: "Tracción", archivo: "fichas/traccion.pdf" },
  { patron: "Core", archivo: "fichas/core.pdf" }
];
