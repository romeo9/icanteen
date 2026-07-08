import React from 'react'
import { ItemDashboard } from './components/ItemDashboard';
import { AddItemForm } from './components/AddItemForm';

function App() {
  return (
    <div data-theme="light">
      <header>
        <h1> iCanteen</h1>
        <p>Basement Inventory & Storage Tracker</p>
      </header>
      
      <main>
        {/* Form to take a photo and add an item */}
        <div className="divider">Add Item</div>
        <AddItemForm />
        
        <div className="divider">Items Dashboard</div>
        {/* Gallery to display the items */}
        <ItemDashboard />
      </main>
      <div className="divider"></div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
