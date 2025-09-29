const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// السماح بقراءة ملفات CSS وJS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// معالجة البحث
app.post('/search', (req, res) => {
  const query = req.body.query.toLowerCase();

  // روابط البحث التجريبية
  const links = [
    { title: 'Node.js Official', url: 'https://nodejs.org/' },
    { title: 'Express.js Guide', url: 'https://expressjs.com/' },
    { title: 'GitHub', url: 'https://github.com/' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }
  ];

  // فلترة النتائج حسب البحث
  const results = links.filter(link => link.title.toLowerCase().includes(query));

  let html = `<h1>نتائج البحث عن "${query}"</h1>`;
  if(results.length === 0){
    html += `<p>لا توجد نتائج</p>`;
  } else {
    html += '<ul>';
    results.forEach(link => {
      html += `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`;
    });
    html += '</ul>';
  }
  html += `<p><a href="/">عودة للصفحة الرئيسية</a></p>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
