ymaps.ready(init);

const resultNode = document.querySelector("#result");
const distanceNode = document.querySelector("#distance");
const addressNode = document.querySelector("#address");
const windowNode = document.querySelector("#window");

const addressInput = document.querySelector(".map__address-input");
const addressBtn = document.querySelector(".map__address-btn");

function init() {
  let myMap = new ymaps.Map(
    "map",
    {
      center: [55.75396, 37.620393], // Москва
      zoom: 10,
      controls: ["zoomControl"],
    },
    {
      searchControlProvider: "yandex#search",
      suppressMapOpenBlock: true, // Отключаем zoom по двойному клику
    }
  );

  let userMarker;
  let userMarkerCoords;

  myMap.behaviors.disable("dblClickZoom");

  (polygonCoordinates = [
    [55.79175534508835, 37.59750656127927],
    [55.79145797534432, 37.57950248718257],
    [55.7891814984683, 37.57153041839594],
    [55.785744157314205, 37.56424499511716],
    [55.777695511835354, 37.55616455078123],
    [55.77370928779209, 37.55048736572264],
    [55.76992101206133, 37.54084304809567],
    [55.75738022665763, 37.53155769348138],
    [55.747622806011, 37.53069156646718],
    [55.738094761083644, 37.53472169876091],
    [55.73139262108873, 37.54394654273981],
    [55.72817689155846, 37.5421850585937],
    [55.72062490386962, 37.54203811645502],
    [55.71491029728946, 37.54574119567867],
    [55.71113319846842, 37.57210357666011],
    [55.713179012037045, 37.58163223266599],
    [55.70858084823179, 37.58673988342281],
    [55.706696163901775, 37.59253417968744],
    [55.70166634071362, 37.61184753417963],
    [55.705355158352276, 37.61704101562498],
    [55.70574820120431, 37.629100952148384],
    [55.70415181970698, 37.65659149169918],
    [55.713433469758186, 37.67582992553708],
    [55.720011369515824, 37.697122116088835],
    [55.72388120574985, 37.70811153411862],
    [55.72949718347936, 37.70433652877804],
    [55.73714767682628, 37.69592589378351],
    [55.74329646394305, 37.69515380382534],
    [55.74595862002504, 37.69609832763671],
    [55.7509797529929, 37.695820465087884],
    [55.75794305371232, 37.69156166076658],
    [55.76452138069158, 37.69114887237547],
    [55.7689713934812, 37.688882541656454],
    [55.77680818874176, 37.67813633918762],
    [55.7849823861986, 37.66143358707428],
    [55.79216377852852, 37.65273888826367],
    [55.79238116979468, 37.641984252929674],
    [55.79099607866334, 37.63416931152342],
    [55.79227653241976, 37.6245941162109],
    [55.79273692593284, 37.61909515380861],
    [55.79175534508835, 37.59750656127927],
  ]),
    // Создаем многоугольник.
    (yellowPolygon = new ymaps.Polygon(
      [polygonCoordinates],
      {
        // Описываем свойства геообъекта.
        hintContent: "Третье транспортное кольцо",
      },
      {
        // Задаем опции геообъекта.
        // Цвет заливки.
        fillColor: "#00FF0033",
        // Ширина обводки.
        strokeWidth: 3,
        // Цвет обводки.
        strokeColor: "#897487",
        // Отключаем возможность перетаскивания.
        draggable: false,
      }
    ));

  (polygonCoordinates = [
    [55.73063351639555, 37.374808854233194],
    [55.73220875424878, 37.34690247684594],
    [55.71914283196062, 37.277253875247936],
    [55.71714339792947, 37.268753141514786],
    [55.71853538705538, 37.260595730535584],
    [55.72160988351633, 37.2516623477862],
    [55.72808786301037, 37.2542395325283],
    [55.73892306485048, 37.251151891830986],
    [55.78675949057045, 37.2579152736035],
    [55.80209964429839, 37.27862451742386],
    [55.80602396343112, 37.32072448730467],
    [55.82009914911626, 37.354493713378844],
    [55.82868080665719, 37.364511871337854],
    [55.83451667115118, 37.3846271514892],
    [55.838979844073386, 37.3939981460571],
    [55.85280038145299, 37.392503833770746],
    [55.868589874296866, 37.40274300575255],
    [55.88034211708267, 37.43326847553252],
    [55.88544506461619, 37.47393709421154],
    [55.89957141958053, 37.5025111496448],
    [55.90740407176765, 37.53602425158021],
    [55.91093413763821, 37.576813395321345],
    [55.89672076718795, 37.6684143066406],
    [55.90698055092485, 37.66772766113279],
    [55.912687898737204, 37.67081756591795],
    [55.91477000761168, 37.675109100341764],
    [55.92140207322662, 37.683434677124],
    [55.92225013046772, 37.69416351318356],
    [55.922015298971594, 37.709221649169905],
    [55.934233735041985, 37.727737045288045],
    [55.931803676962765, 37.74762573242184],
    [55.92702508179474, 37.756156709248486],
    [55.915342397578115, 37.77415510781809],
    [55.905143047053436, 37.766674814915405],
    [55.87407262189286, 37.74235535179364],
    [55.85698324995502, 37.7765441920101],
    [55.838390875375126, 37.814237977352676],
    [55.81824323201363, 37.83682556152337],
    [55.83216792554414, 37.904336547851464],
    [55.832846683957214, 37.93769378662096],
    [55.82982807407812, 37.95753440856922],
    [55.81405241928962, 37.955402374267436],
    [55.80542531453689, 37.951553726196195],
    [55.79602267016938, 37.9463317871093],
    [55.78823850454747, 37.946359252929604],
    [55.77890487053662, 37.96080627441395],
    [55.777309765454646, 37.964266967773355],
    [55.740867517859705, 38.35636901855454],
    [55.72971604012754, 38.38282089233384],
    [55.71894894652217, 38.37768707275378],
    [55.66326474864076, 38.227343749999974],
    [55.688703397922055, 37.9837417602539],
    [55.66747299377024, 37.91652908325196],
    [55.654718290211015, 37.882922744750935],
    [55.65144553210094, 37.83796710968009],
    [55.635356922643226, 37.814984130859315],
    [55.61447069690532, 37.77565917968747],
    [55.59488725048797, 37.74192047119137],
    [55.579063198605596, 37.6979286193847],
    [55.573348872987346, 37.65599670410155],
    [55.58095534440516, 37.576252746582],
    [55.60186668188655, 37.499301910400334],
    [55.71067195593695, 37.386988830566345],
    [55.73063351639555, 37.374808854233194],
  ]),
    (redPolygon = new ymaps.Polygon(
      [polygonCoordinates],
      {
        hintContent: "Зона повышенного спроса",
      },
      {
        fillColor: "#FF000033", // Красный полупрозрачный
        strokeWidth: 3,
        strokeColor: "#FF0000", // Красный
        opacity: 0.5,
        draggable: false,
        clickable: false,
        editor: {
          options: {
            redactable: true, // Включаем режим редактирования
          },
        },
      }
    ));

  (polygonCoordinates = [
    [58.54262236171879, 40.729323386134354],
    [58.662896265861065, 39.17656666673315],
    [58.67506957733242, 37.97609004053954],
    [58.618529660639275, 37.08323060184591],
    [58.35326554471691, 35.65127731274792],
    [58.03096404254002, 34.386615325279294],
    [57.46971465317492, 33.385625212810645],
    [56.124905108336044, 32.5701684253735],
    [55.486924625936275, 32.23811007543628],
    [54.78763702812977, 32.345504850499104],
    [54.090193775539, 32.74224632050821],
    [53.606509691638394, 33.33612486801274],
    [52.95826591170592, 34.281565915517334],
    [52.7023776952935, 35.732378056771836],
    [52.43979102170557, 36.41383881489911],
    [52.36434054773953, 37.13924488552639],
    [52.261803764548084, 38.19424079990366],
    [52.3478174067676, 39.20529140178096],
    [52.51416819831204, 40.919467003658276],
    [52.91703920305037, 42.56757042959689],
    [53.40691837294051, 43.87502058006612],
    [53.77652900433446, 44.53147296143351],
    [54.52810176742788, 44.57269096780086],
    [55.1826678996865, 44.395546064734496],
    [55.75232911334975, 44.130510536668204],
    [56.979521384413324, 43.46996719610185],
    [57.9110475065723, 42.282080105535535],
    [58.54262236171879, 40.729323386134354],
  ]),
    (bluePolygon = new ymaps.Polygon(
      [polygonCoordinates],
      {
        hintContent: "",
      },
      {
        fillColor: "#A39CE6", // Красный полупрозрачный
        strokeWidth: 3,
        strokeColor: "#A292A2", // Красный
        opacity: 0.5,
        draggable: false,
        clickable: false,
        editor: {
          options: {
            redactable: true, // Включаем режим редактирования
          },
        },
      }
    ));

  // Добавляем многоугольник на карту.
  myMap.geoObjects.add(redPolygon);
  myMap.setBounds(redPolygon.geometry.getBounds());
  myMap.geoObjects.add(yellowPolygon);
  myMap.geoObjects.add(bluePolygon);

  let userRoute;

  const calculateDistance = (address) => {
    windowNode.classList.add("map__window--active");

    ymaps.route(["г. Москва ул.Адмирала Корнилова 23б", address], {}).done(
      function (route) {
        route.options.set("mapStateAutoApply", true);

        if (userRoute) {
          myMap.geoObjects.remove(userRoute);
        }

        myMap.geoObjects.add(route);
        userRoute = route;

        const redZoneMultiplier = redPolygon.geometry.contains(userMarkerCoords)
          ? 2.5
          : 1;

        const distancePrice = 120 * redZoneMultiplier;
        const fixedPrice = 5500;

        const firstPath = route.getPaths().get(0);
        const distance = firstPath.getLength() / 1000;

        console.log(distance * distancePrice);

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

  // Обработчик двойного клика по карте
  myMap.events.add("dblclick", function (e) {
    let coords = e.get("coords");

    userMarkerCoords = coords;

    if (userMarker) {
      myMap.geoObjects.remove(userMarker);
    }

    userMarker = new ymaps.Placemark(coords, {
      balloonContent: findNearestAddress(coords),
    });
    myMap.geoObjects.add(userMarker);
  });

  function geocodeAddress(address) {
    // Геокодируем адрес.
    ymaps.geocode(address).then(
      function (res) {
        var coords = res.geoObjects.get(0).geometry.getCoordinates();

        if (userMarker) {
          myMap.geoObjects.remove(userMarker);
        }

        // Создаем метку и добавляем на карту
        userMarker = new ymaps.Placemark(coords, {
          hintContent: address,
        });

        userMarkerCoords = coords;

        myMap.geoObjects.add(userMarker);

        calculateDistance(address);
      },
      function (err) {
        alert("Не удалось геокодировать адрес: " + address);
      }
    );
  }

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

            nearestAddress = address;
            if (distance < minDistance) {
              minDistance = distance;
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

  addressBtn.addEventListener("click", () => {
    const address = addressInput.value;
    geocodeAddress(address);
  });
}
