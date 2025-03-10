// ymaps.ready(init);

// function init() {
//   var myMap = new ymaps.Map("map", {
//     center: [55.75396, 37.620393], // Москва
//     zoom: 10,
//   });

//   var warehouseCoordinates = [55.635843, 37.456529]; // г. Москва ул.Адмирала Корнилова 23б
//   var warehousePlacemark = new ymaps.Placemark(
//     warehouseCoordinates,
//     {
//       balloonContent: "Склад",
//     },
//     {
//       preset: "islands#redWarehouseIcon",
//     }
//   );

//   myMap.geoObjects.add(warehousePlacemark);

//   let route = ymaps
//     .route([
//       "тест",
//       {
//         type: "viaPoint",
//         point: [59.99328, 30.342791],
//       },
//       "Санкт-Петербург, Финляндский вокзал",
//     ])
//     .then(
//       function (route) {
//         myMap.geoObjects.add(route);
//       },
//       function (error) {
//         console.log(error);
        
//         alert("возникла ошибка", error);
//       }
//     );

//   window.calculateDelivery = function () {
//     var address = document.getElementById("address").value;
//     var geocode = ymaps.geocode(address);

//     geocode.then(
//       function (res) {
//         var firstGeoObject = res.geoObjects.get(0);

//         if (firstGeoObject) {
//           var userCoordinates = firstGeoObject.geometry.getCoordinates();

//           // Рассчитываем расстояние (в метрах)
//           ymaps
//             .route([userCoordinates, warehouseCoordinates])
//             .then(function (route) {
//               var distance = route.getTotalLength(); // в метрах
//               var distanceInKilometers = distance / 1000;

//               var pricePerKilometer = 120; // Цена за км
//               var fixedMinimumCost = 5500; // Фиксированная минимальная стоимость

//               var deliveryCost = distanceInKilometers * pricePerKilometer;

//               // Применяем минимальную стоимость, если рассчитанная стоимость меньше
//               if (deliveryCost < fixedMinimumCost) {
//                 deliveryCost = fixedMinimumCost;
//               }

//               document.getElementById("result").innerText =
//                 "Стоимость доставки: " + deliveryCost.toFixed(2) + "₽";

//               // Отображаем маршрут на карте
//               myMap.geoObjects.removeAll(); // Удаляем все объекты, чтобы не было наслоений
//               myMap.geoObjects.add(warehousePlacemark); // Добавляем склад снова
//               myMap.geoObjects.add(route);

//               //  Изменяем границы карты, чтобы маршрут был виден целиком.
//               myMap.setBounds(route.getBounds(), {
//                 checkZoomRange: true,
//                 zoomMargin: 15, // отступ от границ контейнера карты.
//               });
//             });
//         } else {
//           document.getElementById("result").innerText =
//             "Не удалось определить координаты для введенного адреса.";
//         }
//       },
//       function (err) {
//         document.getElementById("result").innerText =
//           "Ошибка геокодирования: " + err.message;
//       }
//     );
//   };
// }
