import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './routes/Profile';
import About from "./routes/About"
import ChefsPage from './routes/Chefs';
import Reservations from './routes/Reservations';
import Chat from './routes/Chat';
import ChefAgendamentos from './routes/ChefAgendamentos';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="text-center">Carregando...</div>}>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/sobre" element={ <About />} />

            <Route path="/chefagendamentos" element={
              <PrivateRoute>
                <ChefAgendamentos />
              </PrivateRoute>
            } />

            <Route path="/perfil" element={ 
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
            } />

             <Route path="/chefs" element={ 
                <PrivateRoute>
                  <ChefsPage />
                </PrivateRoute>
            } />

            <Route path="/" element={ 
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />

            <Route path="/agendamentos" element={ 
                <PrivateRoute>
                    <Reservations />
                </PrivateRoute>
            } />

            <Route path="/chat" element={ 
                <PrivateRoute>
                    <Chat />
                </PrivateRoute>
            } />
            <Route path="/chef-agendamentos" element={
               <PrivateRoute>
                    <ChefAgendamentos />
               </PrivateRoute>
            } />



          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
