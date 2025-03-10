ymaps.ready(init);

const resultNode = document.querySelector("#result");
const distanceNode = document.querySelector("#distance");
const addressNode = document.querySelector("#address");
const windowNode = document.querySelector("#window");

function init() {
  let myMap = new ymaps.Map("map", {
    center: [55.75396, 37.620393], // Москва
    zoom: 10,
  });

  let userRoute;

  const calculateDistance = (address) => {
    ymaps.route(["г. Москва ул.Адмирала Корнилова 23б", address], {}).done(
      function (route) {
        route.options.set("mapStateAutoApply", true);

        if (userRoute) {
          myMap.geoObjects.remove(userRoute);
        }

        myMap.geoObjects.add(route);
        userRoute = route;

        const distancePrice = 120;
        const fixedPrice = 5500;

        const firstPath = route.getPaths().get(0);
        const distance = firstPath.getLength() / 1000;

        let price =
          distance * distancePrice < fixedPrice
            ? fixedPrice
            : distance * distancePrice;

        resultNode.textContent = `${price.toFixed(2)} ₽`;

        distanceNode.textContent = `расстояние: ${Math.floor(distance)} км`;
      },
      function (err) {
        throw err;
      },
      this
    );
  };

  let userMarker;

  // Обработчик двойного клика по карте
  myMap.events.add("click", function (e) {
    let coords = e.get("coords");

    if (userMarker) {
      myMap.geoObjects.remove(userMarker);
    }

    userMarker = new ymaps.Placemark(coords, {
      balloonContent: findNearestAddress(coords),
    });
    myMap.geoObjects.add(userMarker);

    windowNode.classList.add("map__window--active");
  });

  function findNearestAddress(coords) {
    ymaps
      .geocode(coords, {
        kind: "house", // Ищем только дома
        results: 5, // Получаем до 5 результатов
      })
      .then(
        function (res) {
          let nearestAddress = null;
          let minDistance = Infinity;

          res.geoObjects.each(function (geoObject) {
            let address = geoObject.getAddressLine();
            let location = geoObject.geometry.getCoordinates();

            // Вычисляем расстояние между точками
            let distance = ymaps.coordSystem.geo.getDistance(coords, location);

            if (distance < minDistance) {
              minDistance = distance;
              nearestAddress = address;
            }
          });

          if (nearestAddress) {
            calculateDistance(nearestAddress);
            addressNode.textContent = nearestAddress;
          } else {
            address.textContent = "Адрес не найден поблизости";
          }
        },
        function (err) {
          console.log("Ошибка геокодирования: " + err.message);
          document.getElementById("nearest-address").textContent =
            "Ошибка поиска адреса";
        }
      );
  }
}
