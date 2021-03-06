# Netlify-example
Test deploy index.html on Netlify
домен в Netlify https://loving-meitner-047a09.netlify.app
Прототип в Figma https://www.figma.com/file/6n6W1EqDiGhuJWwIa5qShC/Untitled?node-id=0%3A1

# sprint 2
Проект разбит на модули и компоненты 
Подключен TS
Подключен шаблонизатор Handlebars
Разработан общий механизм валидации полей ввода

##Структура проекта:
- static/css все стили проекта
- static/images изображения
- static/pages все HTML страницы проекта
- static/index.html ссылки на вс страницы

- src/components папка с переиспользуемыми компанентами
- src/pages исходники ts для каждой страницы проекта
- src/templates общие шаблоны

##Запуск проекта
Компиляция проекта **npm run build**
Запуск сервера **npm run start**
Открыть ссылку http://localhost:4000
