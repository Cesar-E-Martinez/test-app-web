import React, { useState, useEffect } from 'react';
import './styles.css';
import Cart from './Cart';
import CartView from './CartView';
import AdminPanel from './AdminPanel';
import ProductList from './ProductList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserProfile from './UserProfile';
import { db, auth } from './firebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        console.log('Productos obtenidos:', productsList);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('Usuario autenticado:', user.email);
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('Datos del usuario:', userData);
          if (userData.role === 'admin') {
            setIsAdmin(true);
            console.log('Usuario es administrador');
          }
        });
        setLoggedIn(true);
        setShowLogin(false);
      } else {
        setError('No se encontraron datos del usuario.');
        console.log('No se encontraron datos del usuario.');
      }
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Error en la autenticación:', error);
    }
  };

  const handleRegister = async (email, password) => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario registrado:', user.email);
      await addDoc(collection(db, "users"), {
        email: user.email,
        role: 'user'
      });
      setLoggedIn(true);
      setShowRegister(false);
      alert('Usuario registrado y autenticado.');
    } catch (error) {
      setError('Error en el registro');
      console.error('Error en el registro:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setIsAdmin(false);
      setUsername('');
      setPassword('');
      setCart([]);
      setShowCart(false);
      setShowProfile(false);
      console.log('Usuario ha cerrado sesión');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const addToCart = (product) => {
    console.log(`Agregando ${product.name} al carrito`);
    setCart(prevCart => [...prevCart, product]);
  };

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const handlePurchase = async () => {
    if (!loggedIn) {
      alert('Por favor, inicie sesión o regístrese para continuar con la compra.');
      setShowLogin(true);
      setShowCart(false);
    } else {
      try {
        const purchase = {
          user: auth.currentUser.email,
          items: cart.map(item => ({ id: item.id, name: item.name, price: Number(item.price) })), // Asegúrate de que sea un número
          total: cart.reduce((total, item) => total + Number(item.price), 0), // Asegúrate de que sea un número
          date: new Date().toLocaleString() // Formatea la fecha y hora como string
        };
        await addDoc(collection(db, "purchases"), purchase);
        alert('Compra realizada con éxito');
        setCart([]);
        setShowCart(false);
      } catch (error) {
        console.error('Error realizando la compra:', error);
        alert('Error realizando la compra. Intente de nuevo más tarde.');
      }
    }
  };
  
  

  console.log('Estado de la aplicación:', { loggedIn, isAdmin });

  return (
    <div className="App">
      {!loggedIn && !showLogin && !showRegister && (
        <div>
          <button onClick={() => setShowLogin(true)} className="login-button">Iniciar Sesión</button>
          <button onClick={() => setShowRegister(true)} className="register-button">Registrarse</button>
          <Cart cartCount={cart.length} openCart={openCart} />
          <ProductList products={products} addToCart={addToCart} />
        </div>
      )}

      {!loggedIn && showLogin && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          error={error}
          setShowLogin={setShowLogin}
        />
      )}

      {!loggedIn && showRegister && (
        <RegisterForm
          handleRegister={handleRegister}
          error={error}
          setShowRegister={setShowRegister}
        />
      )}

      {loggedIn && isAdmin && (
        <div>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          <AdminPanel />
        </div>
      )}

      {loggedIn && !isAdmin && !showProfile && (
        <div>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          <button onClick={() => setShowProfile(true)} className="profile-button">Ver Perfil</button>
          <Cart cartCount={cart.length} openCart={openCart} />
          <ProductList products={products} addToCart={addToCart} />
        </div>
      )}

      {showCart && (
        <CartView
          cart={cart}
          closeCart={closeCart}
          handlePurchase={handlePurchase}
        />
      )}

      {loggedIn && !isAdmin && showProfile && (
        <UserProfile closeProfile={() => setShowProfile(false)} />
      )}
    </div>
  );
}

export default App;
