import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = ({ closeProfile }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const q = query(collection(db, "purchases"), where("user", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        const purchasesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPurchases(purchasesList);
        console.log('Compras obtenidas:', purchasesList);
      } catch (error) {
        console.error('Error obteniendo compras:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="user-profile">
      <h2>Perfil de Usuario</h2>
      <button onClick={closeProfile} className="close-profile-button">Cerrar</button>
      <h3>Compras Realizadas</h3>
      {purchases.length === 0 ? (
        <p>No has realizado ninguna compra.</p>
      ) : (
        <ul>
          {purchases.map(purchase => (
            <li key={purchase.id}>
              <p>Fecha y Hora: {purchase.date}</p>
              <p>Total: ${parseFloat(purchase.total).toFixed(2)}</p> {/* Asegúrate de que purchase.total es un número */}
              <ul>
                {purchase.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${parseFloat(item.price).toFixed(2)} {/* Asegúrate de que item.price es un número */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
