import React from "react";
// Corrected import to use the custom hook
import { useAuth } from "../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom"; // Keep this if you plan to add a logout function

// --- Placeholder Icon Component ---
// Replace the children (Unicode) with actual SVG components from a library (e.g., React Icons)
const Icon = ({ children }) => <span style={{ marginRight: '10px', fontSize: '18px', display: 'flex', alignItems: 'center' }}>{children}</span>;

// --- Styling Object (Mimicking the design from 1000085728.jpg) ---
const styles = {
  // Main Layout
  pageContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f0f2f5', 
    borderRadius: '15px',
    margin: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  // Sidebar
  sidebar: {
    width: '240px',
    background: '#ffffff',
    padding: '20px 0',
    borderRight: '1px solid #eee',
  },
  logoSection: {
    padding: '0 20px 30px 20px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#4a67ff',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  sidebarMenu: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  menuItem: {
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  activeMenuItem: {
    background: '#e6ebff', 
    color: '#4a67ff', 
    borderRight: '4px solid #4a67ff',
    fontWeight: '600',
  },
  menuHeader: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#999',
    padding: '10px 20px 5px 20px',
    marginTop: '10px',
  },

  // Main Content Area
  mainContent: {
    flexGrow: 1,
    padding: '30px 40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '30px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: '500',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: '#ccc', // Placeholder color
    border: '2px solid #333',
  },
  // Dashboard Body
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '10px',
  },
  dashboardBadge: {
    display: 'inline-block',
    padding: '5px 10px',
    background: '#f0f0f0',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#555',
    marginBottom: '30px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  }
};

// --- Reusable Card Component ---
const DashboardCard = ({ title, description, isPrimary = false }) => {
  const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: isPrimary ? '#e6ebff' : '#ffffff', 
    border: isPrimary ? '1px solid #4a67ff' : '1px solid #eee',
  };

  const buttonStyle = {
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    background: isPrimary ? '#4a67ff' : '#f0f0f0',
    color: isPrimary ? 'white' : '#555',
  };

  return (
    <div style={cardStyle}>
      <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 5px 0', color: isPrimary ? '#4a67ff' : '#333' }}>
        {title}
      </h4>
      <p style={{ fontSize: '12px', color: '#888', margin: '0 0 10px 0', flexGrow: 1 }}>
        {description}
      </p>
      <button style={buttonStyle}>
        Combina
      </button>
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  // Get the user object from the custom hook
  const { user } = useAuth();
  
  // Sample data for the dashboard cards, mimicking the image content
  const cardData = [
    { title: "Volok Calararing", description: "Lorem ploin ip sg lool dolut eonaueor", isPrimary: true },
    { title: "Wetons Dolp", description: "Lorem ploin ip sg lool dolut eonaueor" },
    { title: "Reagnt Woms", description: "Lorem ploin ip sg lool dolut eonaueor" },
    { title: "Wicle Redbing", description: "Lorem ploin ip sg lool dolut eonaueor", isPrimary: true },
    { title: "Maters Winipy", description: "Lorem ploin ip sg lool dolut eonaueor" },
    { title: "Content Splow", description: "Lorem ploin ip sg lool dolut eonaueor", isPrimary: true },
    { title: "Wist Wing", description: "Lorem ploin ip sg lool dolut eonaueor" },
    { title: "Content Splow", description: "Lorem ploin ip sg lool dolut eonaueor" },
  ];
  
  // Use user's name from context, or fall back to "User"
  const userName = user?.name?.split(' ')[0] || "User"; 

  return (
    <div style={styles.pageContainer}>
      
      {/* 1. Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoSection}>
          {/* Logo icon (e.g., a simple shape) and text */}
          <Icon>&#9679;</Icon> Logo
          <span style={{fontSize: '10px', color: '#666', fontWeight: '500', marginLeft: '5px'}}>(Welcome, {user?.email || 'Guest'})</span>
        </div>
        
        <div style={styles.menuHeader}>Moding</div>
        <ul style={styles.sidebarMenu}>
          {/* Active Item: Yorum */}
          <li style={{ ...styles.menuItem, ...styles.activeMenuItem }}>
            <Icon>&#x2302;</Icon> Yorum
          </li>
          
          {/* Inactive Items */}
          <li style={styles.menuItem}><Icon>&#9733;</Icon> Sonole</li>
          <li style={styles.menuItem}><Icon>&#9737;</Icon> Shooch</li>
          <li style={styles.menuItem}><Icon>&#9788;</Icon> Monly</li>
          <li style={styles.menuItem}><Icon>&#9874;</Icon> Sontoart</li>
        </ul>
      </div>

      {/* 2. Main Content */}
      <div style={styles.mainContent}>
        
        {/* Header (User Info) */}
        <div style={styles.header}>
          <div style={styles.userProfile}>
            <span style={{color: '#333'}}>{userName}</span>
            {/* Placeholder for the user avatar image */}
            <div style={styles.avatar}></div>
          </div>
        </div>

        {/* Dashboard Body */}
        <h2 style={styles.welcomeTitle}>Welcome You</h2>
        <span style={styles.dashboardBadge}>Dashboard</span>

        {/* Card Grid */}
        <div style={styles.cardGrid}>
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              isPrimary={card.isPrimary}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
