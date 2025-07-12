import { useState, useEffect } from 'react';
import './StudyPlan.css';

const LOCAL_STORAGE_KEY = 'Amazon-studyplan-completed';

const StudyPlan = () => {
  // const [completedItems, setCompletedItems] = useState(new Set());
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [activeWeek, setActiveWeek] = useState(1);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(completedItems)));
  }, [completedItems]);

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const getIcon = (topic: string) => {
    switch(topic) {
      case 'C/C++': return '💻';
      case 'DSA': return '📘';
      case 'OOP': return '⚙️';
      case 'OS': return '🖥️';
      case 'Networks': return '🌐';
      case 'RDBMS': return '🗄️';
      case 'System Design': return '🏗️';
      default: return '📘';
    }
  };

 const studyPlan = {
    "Week 1: Foundation Building": {
      "C/C++ Basics": [
        "Syntax, variables, data types, operators",
        "Control structures (if/else, loops)",
        "Functions and scope",
        "Arrays and pointers basics",
        "Memory management (malloc, free, new, delete)",
        "Practice: 10 basic coding problems"
      ],
      "DSA Fundamentals": [
        "Time/Space complexity (Big O notation)",
        "Arrays and strings manipulation",
        "Two-pointer technique",
        "Basic sorting algorithms (bubble, selection, insertion)",
        "Practice: 15 easy LeetCode problems"
      ],
      "Daily Practice (3 hours)": [
        "1 hour: C++ coding practice",
        "1.5 hours: Easy DSA problems (HackerRank/LeetCode)",
        "30 mins: Start planning first project (Calculator/To-Do app)"
      ]
    },
    "Week 2: Core Data Structures": {
      "C++ Intermediate": [
        "STL containers (vector, map, set, queue, stack)",
        "Iterators and algorithms",
        "String manipulation and regex",
        "File I/O operations",
        "Exception handling"
      ],
      "Data Structures": [
        "Linked Lists (singly, doubly, circular)",
        "Stacks and Queues implementation",
        "Trees (binary trees, BST)",
        "Hash tables and collision handling",
        "Practice: 20 medium DSA problems"
      ],
      "OOP Basics": [
        "Classes and objects",
        "Encapsulation, inheritance, polymorphism",
        "Constructors and destructors",
        "Virtual functions and abstract classes"
      ],
      "Daily Practice (3 hours)": [
        "1 hour: Implement data structures from scratch",
        "1.5 hours: Medium DSA problems",
        "30 mins: Work on Project 1 (complete basic version)"
      ]
    },
    "Week 3: Advanced DSA + OS Basics": {
      "Advanced DSA": [
        "Graph algorithms (BFS, DFS, shortest path)",
        "Dynamic programming fundamentals",
        "Greedy algorithms",
        "Backtracking and recursion",
        "Practice: 25 medium-hard problems"
      ],
      "Operating Systems": [
        "Process management and scheduling",
        "Memory management (paging, segmentation)",
        "File systems and I/O",
        "Deadlocks and synchronization",
        "Threading and concurrency"
      ],
      "Algorithm Design": [
        "Divide and conquer strategies",
        "Problem-solving patterns",
        "Optimization techniques"
      ],
      "Daily Practice (3 hours)": [
        "1.5 hours: Hard DSA problems",
        "1 hour: OS concepts with coding examples",
        "30 mins: Start Project 2 (Multi-threaded application)"
      ]
    },
    "Week 4: Networks + RDBMS": {
      "Computer Networks": [
        "OSI and TCP/IP models",
        "HTTP/HTTPS, REST APIs",
        "Socket programming basics",
        "Network security fundamentals",
        "DNS, DHCP, routing protocols"
      ],
      "RDBMS": [
        "SQL fundamentals (SELECT, JOIN, subqueries)",
        "Database design and normalization",
        "Indexing and query optimization",
        "ACID properties and transactions",
        "Practice: Design 2-3 database schemas"
      ],
      "Advanced C++": [
        "Smart pointers and RAII",
        "Template programming",
        "Multi-threading (std::thread, mutex)",
        "Lambda expressions and functional programming"
      ],
      "Daily Practice (3 hours)": [
        "1.5 hours: Advanced DSA problems",
        "1 hour: SQL practice and database design",
        "30 mins: Complete Project 2"
      ]
    },
    "Week 5: System Design + Distributed Systems": {
      "System Design Basics": [
        "Scalability principles",
        "Load balancing and caching",
        "Database sharding and replication",
        "Microservices architecture",
        "Design patterns (Singleton, Factory, Observer)"
      ],
      "Distributed Systems": [
        "CAP theorem and consistency models",
        "Distributed consensus (Raft, Paxos)",
        "Message queues and pub/sub",
        "Fault tolerance and recovery",
        "Multi-tiered architecture patterns"
      ],
      "CS Fundamentals": [
        "Compiler design basics",
        "Computer architecture",
        "Parallel computing concepts"
      ],
      "Daily Practice (3 hours)": [
        "1.5 hours: System design problems",
        "1 hour: Mock interviews (DSA)",
        "30 mins: Start Project 3 (Distributed chat app/API)"
      ]
    },
    "Week 6: Interview Prep + Review": {
      "Amazon-Specific Prep": [
        "Leadership Principles deep dive",
        "Behavioral question preparation (STAR method)",
        "Amazon coding interview patterns",
        "System design for e-commerce scale",
        "Review Amazon engineering blog posts"
      ],
      "Comprehensive Review": [
        "All DSA topics rapid review",
        "OS and Networks quick revision",
        "System design case studies",
        "Code review and optimization",
        "Mock interview sessions"
      ],
      "Final Projects": [
        "Complete and polish all 3 projects",
        "Prepare project presentations",
        "GitHub portfolio cleanup"
      ],
      "Daily Practice (3 hours)": [
        "2 hours: Mock interviews (technical + behavioral)",
        "1 hour: Final project touches and portfolio"
      ]
    }
  };


  const calculateProgress = () => {
    const totalItems = Object.values(studyPlan).reduce((total, week) =>
      total + Object.values(week).reduce((weekTotal, topics) =>
        weekTotal + (Array.isArray(topics) ? topics.length : 0), 0
      ), 0
    );
    return Math.round((completedItems.size / totalItems) * 100);
  };

  const getWeekProgress = (weekData: { [topic: string]: string[] }, weekTitle?: string) => {
    const weekItems = Object.values(weekData).reduce((total, topics) =>
      total + (Array.isArray(topics) ? topics.length : 0), 0
    );
    const completedInWeek = Object.entries(weekData).reduce((total, [topic, items]) =>
      total + (Array.isArray(items) ? items.filter(item =>
        completedItems.has(`${weekTitle ?? ''}-${topic}-${item}`)
      ).length : 0), 0
    );
    return Math.round((completedInWeek / weekItems) * 100);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">🏆 Amazon SDE-I Study Plan</h1>
          <div className="progress-summary">
            <div className="progress-percent">{calculateProgress()}%</div>
            <div className="progress-label">Overall Progress</div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
        </div>

        <div className="summary-grid">
          <div className="summary-box blue">
            <div className="summary-value">6 Weeks</div>
            <div className="summary-label">Duration</div>
          </div>
          <div className="summary-box green">
            <div className="summary-value">3 Hours/Day</div>
            <div className="summary-label">Daily Practice</div>
          </div>
          <div className="summary-box purple">
            <div className="summary-value">3 Projects</div>
            <div className="summary-label">To Build</div>
          </div>
        </div>

        <div className="week-buttons">
          {Object.entries(studyPlan).map(([weekTitle, weekData], index) => (
            <button
              key={index}
              onClick={() => setActiveWeek(index + 1)}
              className={`week-button ${activeWeek === index + 1 ? 'active' : ''}`}
            >
              Week {index + 1}
              <div className="week-progress">{getWeekProgress(weekData, weekTitle)}%</div>
            </button>
          ))}
        </div>
      </div>

      {Object.entries(studyPlan).map(([weekTitle, weekData], weekIndex) => (
        <div
          key={weekIndex}
          className={`card ${activeWeek === weekIndex + 1 ? 'visible' : 'hidden'}`}
        >
          <div className="header">
            <h2 className="subtitle">📅 {weekTitle}</h2>
            <div className="progress-summary">
              <div className="progress-percent">{getWeekProgress(weekData, weekTitle)}%</div>
              <div className="progress-label">Week Progress</div>
            </div>
          </div>

          <div className="topics">
            {Object.entries(weekData).map(([topic, items], topicIndex) => (
              <div key={topicIndex} className="topic-group">
                <h3 className="topic-title">{getIcon(topic)} {topic}</h3>
                <div className="topic-items">
                  {items.map((item, itemIndex) => {
                    const itemId = `${weekTitle}-${topic}-${item}`;
                    const isCompleted = completedItems.has(itemId);
                    return (
                      <div
                        key={itemIndex}
                        className={`topic-item ${isCompleted ? 'completed' : ''}`}
                        onClick={() => toggleItem(itemId)}
                      >
                        <span className="checkbox">{isCompleted ? '✅' : '⭕'}</span>
                        <span className={isCompleted ? 'strike' : ''}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h2 className="subtitle">📚 Recommended Resources</h2>
        <div className="resources">
          <div>
            <h3 className="resource-heading">Books & Courses</h3>
            <ul className="resource-list">
              <li>"Cracking the Coding Interview" - Gayle McDowell</li>
              <li>"System Design Interview" - Alex Xu</li>
              <li>"Operating System Concepts" - Silberschatz</li>
              <li>GeeksforGeeks DSA course</li>
            </ul>
          </div>
          <div>
            <h3 className="resource-heading">Practice Platforms</h3>
            <ul className="resource-list">
              <li>LeetCode (focus on Amazon tagged problems)</li>
              <li>HackerRank</li>
              <li>InterviewBit</li>
              <li>Pramp for mock interviews</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
