/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "cairo" : "'Cairo' , sans-serif",
      },
      backgroundImage: {
        "bg-login" : "url('src/images/bg-image.jpg')"
      },
      backgroundColor: {
        "main-blue" : "#1e90ff",
        "second-blue" : "#3867d6",
        "third-blue" : "#4b7bec",
        "forth-blue" : "#2196F3",
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        "zain" : "#01AAAB",
        "one" : "#C0D42F",
        "two" : "#FFD833"
      },
      colors : {
        "main-blue" : "#1e90ff",
        "second-blue" : "#3867d6",
        "third-blue" : "#4b7bec",
        "forth-blue" : "#2196F3",
        "zain" : "#01AAAB",
        "one" : "#C0D42F",
        "two" : "#FFD833"
      },
      zIndex: {
        '1' : '1',
        '2' : '2',
        '3' : '3',
        '4' : '4',
        '5' : '5',
        '-1' : '-1',
        '-2' : '-2',
      },
    },
  },
  plugins: [],
}
