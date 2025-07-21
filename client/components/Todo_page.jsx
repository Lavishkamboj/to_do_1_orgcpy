import React, { useState, useEffect } from 'react';
import { createContext } from 'react';




const TodoPage = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  
 //defining usser data by fetching from db

useEffect(() => {
  const check_data = async () => {
    try {
      const user_data = await fetch('http://localhost:8000/getUserData',{
          method: 'GET',
  credentials: 'include',
      });
      const jsonData = await user_data.json();
      // console.log(jsonData);

      setTasks(jsonData);
    
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  check_data();
}, [task]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    pageWrapper: {
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px',
    },
    container: {
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#ffffff',
      padding: '40px 30px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '30px',
      textAlign: 'center',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '10px',
      marginBottom: '30px',
    },
    input: {
      flex: 1,
      padding: '14px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #94a3b8',
      outline: 'none',
    },
    addButton: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      border: 'none',
      padding: '14px 20px',
      fontSize: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    addButtonHover: {
      backgroundColor: '#0284c7',
    },
    taskList: {
      listStyle: 'none',
      padding: 0,
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f1f5f9',
      padding: '14px 18px',
      borderRadius: '10px',
      marginBottom: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease',
    },
    taskText: {
      fontSize: '1rem',
      color: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 14px',
      fontSize: '0.9rem',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
    deleteButtonHover: {
      backgroundColor: '#dc2626',
    },
    emptyMessage: {
      color: '#64748b',
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '1rem',
    },
  };

  const [hoverAdd, setHoverAdd] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(null);

  const handleAddTask = async() => {

   
    if (task.trim()) {
        //sending data to backened
     const response = await fetch('http://localhost:8000/send_inputData', {
        method: 'POST',               // POST request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({task}) , // send JSON data
        credentials: 'include'
      });
//it will show us the respobse from backend when we send him data-like tahnk you type
     if(response.ok){

  const data = await response.json();
  console.log(data)
  setTask('')
  // window.location.reload()
}

      // setTasks([...tasks, task]);
      // setTask('');
    }
  };

  const handleDeleteTask = async(index) => {
 const response = await fetch('http://localhost:8000/deleteTask', {
        method: 'POST',               // POST request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({index}) , // send JSON data
        credentials: 'include'
      });
//it will show us the respobse from backend when we send him data-like tahnk you type
if(response.ok){

  const data = await response.json();
  console.log(data)
  window.location.reload()
}
    // const newTasks = tasks.filter((_, i) => i !== index);
    // setTasks(newTasks);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Manage Your Tasks</h2>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="What do you need to do?"
            style={styles.input}
            value={task}
            onChange={(e) =>setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            style={{
              ...styles.addButton,
              ...(hoverAdd ? styles.addButtonHover : {}),
            }}
            onClick={handleAddTask}
            onMouseEnter={() => setHoverAdd(true)}
            onMouseLeave={() => setHoverAdd(false)}
          >
            ➕ Add
          </button>
        </div>

        <ul style={styles.taskList}>
          {tasks.length === 0 ? (
            <p style={styles.emptyMessage}>No tasks yet — go ahead and add one! ⚡</p>
          ) : (
            tasks.map((t, i) => (
              <li
                key={t._id}
                style={{
                  ...styles.taskItem,
                  transform: hoverDelete === i ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                <span style={styles.taskText}>✅ {t.task}</span>
                <button
                  style={{
                    ...styles.deleteButton,
                    ...(hoverDelete === i ? styles.deleteButtonHover : {}),
                  }}
                  onClick={() => handleDeleteTask(t._id)}
                  onMouseEnter={() => setHoverDelete(i)}
                  onMouseLeave={() => setHoverDelete(null)}
                >
                  🗑️
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
