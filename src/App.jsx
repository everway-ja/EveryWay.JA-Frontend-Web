import { Routes, Route } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import MainPage from '@pages/MainPage'
import { ThemeProvider } from '@contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
