import { Outlet } from 'react-router-dom'
import { useTheme } from '@contexts/ThemeContext'
import PageFooter from '@ui/PageFooter'

const MainLayout = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="min-h-screen theme-transition bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] flex flex-col">
            {/* Main content */}
            <Outlet />
            
            {/* Footer - added to every page */}
            <PageFooter />
        </div>
    )
}

export default MainLayout
