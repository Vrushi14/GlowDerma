import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Set Handlebars as the view engine
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    times: function (n, block) {
      let accum = '';
      for (let i = 0; i < n; i++) accum += block.fn(this);
      return accum;
    },
    formatDate: function (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Doctors Page
app.get('/doctors', (req, res) => {
  res.render('doctors', {
    title: 'Our Expert Doctors',
    description: 'Our clinic is renowned for medical excellence and expertise in dermatology and skincare treatments.',
  });
});

// Services Page
app.get('/services', (req, res) => {
  const category = req.query.category || 'General';
  res.render('services', {
    title: `${category} Services`,
  });
});

// Book Appointment
app.post('/book-appointment', (req, res) => {
  const { name, email, service, preferredDate, preferredTime } = req.body;
  res.render('appointment', {
    appointment: { name, email, service, preferredDate, preferredTime },
  });
});

// Offerings Page
app.get('/offerings', (req, res) => {
  res.render('offerings', {
    offerings: [
      {
        name: 'Anti-Aging Treatment',
        price: 5000,
        duration: '60 mins',
        description: 'Advanced treatment to reduce fine lines and wrinkles',
        available: true,
      },
      {
        name: 'Acne Treatment',
        price: 3000,
        duration: '45 mins',
        description: 'Specialized treatment for acne-prone skin',
        available: true,
      },
      {
        name: 'Chemical Peel',
        price: 4000,
        duration: '30 mins',
        description: 'Skin resurfacing treatment for even tone',
        available: false,
      },
    ],
  });
});

// Testimonials Page
app.get('/testimonials', (req, res) => {
  res.render('testimonials', {
    testimonials: [
      {
        name: 'John Doe',
        rating: 5,
        comment: 'Excellent service!',
        date: '2024-01-20',
      },
      {
        name: 'Jane Smith',
        rating: 4,
        comment: 'Very professional staff',
        date: '2024-01-18',
      },
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
