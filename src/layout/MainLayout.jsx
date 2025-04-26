import { Outlet } from 'react-router-dom'
import { useTheme } from '@contexts/ThemeContext'

const MainLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen theme-transition bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))]">
      {/* Main content */}
      <Outlet />
    </div>
  )
}

export default MainLayout
