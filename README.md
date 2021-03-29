# Netlify-example
Test deploy index.html on Netlify
домен в Netlify https://loving-meitner-047a09.netlify.app
Прототип в Figma https://www.figma.com/file/6n6W1EqDiGhuJWwIa5qShC/Untitled?node-id=0%3A1

# sprint 2
Проект разбит на модули и компоненты 
Подключен TS
Подключен шаблонизатор Handlebars
Разработан общий механизм валидации полей ввода

# sprint 3
Добавлен xhr для работы с запросами
Подключен роутинг
Добавлены Unit-тесты
Подключен Less
Подключен API чатов, авторизации и пользователей 

##Структура проекта:

- static/images изображения
- static/index.html точка входа

- src/components папка с переиспользуемыми компанентами
- src/pages исходники ts для каждой страницы проекта
- src/templates общие шаблоны
- src/styles все стили проекта
- src/interfaces интерфейсы
- src/services контроллер API
- src/store хранилище общих переменных
- src/utilities утилиты используемые в проекте
- src/index.ts основной модуль

##Запуск проекта
Компиляция проекта **npm run build** **npm run less**
Запуск сервера **npm run start**
Открыть ссылку http://localhost:4000

Запуск тестов **npm run test**
