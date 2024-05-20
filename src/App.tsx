import { ThemeProvider } from '@/components/theme.provider.tsx'
import Nav from './components/shared/navigation/Nav'
import Footer from './components/shared/Footer'
import useUserStore from './stores/user.store'
import { Outlet } from 'react-router-dom'



const App = () => {
  const { user, isLoggedIn } = useUserStore();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='absolute top-0 z-[-2] min-h-screen w-full
      
      dark:bg-gray-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
      bg-slate-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(148,163,184,0.25)_0,rgba(148,163,184,0)_50%,rgba(148,163,184,0)_100%)]
      
      dark:text-neutral-200 text-neutral-800
      '>
        <div className="">
          <Nav id={user?._id} name={user?.name} lastName={user?.lastName} pic={user?.pic} isLoggedIn={isLoggedIn}/>
            <Outlet/>
          <Footer/>
        </div>
        
      </div>
    </ThemeProvider>
  )
}

export default App