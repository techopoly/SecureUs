import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import CreatePost from './CreatePost';
import PostModal from './PostModal';
import styles from './ForumPage.module.css';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

// Updated categories to include "My Posts"
const categories = [
  { id: 'all', name: 'All Posts', icon: '📋' },
  { id: 'myPosts', name: 'My Posts', icon: '👤' },
  { id: 'Incidents', name: 'Incidents', icon: '🚨' },
  { id: 'Blogs', name: 'Blogs', icon: '📝' },
  { id: 'Articles', name: 'Articles', icon: '📄' },
  { id: 'News Feed', name: 'News Feed', icon: '📰' },
  { id: 'Tools', name: 'Tools', icon: '🔧' },
  { id: 'Social Media Security', name: 'Social Media Security', icon: '📱' },
  { id: 'Recent Threats', name: 'Recent Threats', icon: '⚠️' }
];

// Your existing dummy posts data (I've prefixed all IDs with 'dummy_' for you)
const dummyPostsData = [
  // INCIDENTS CATEGORY
  {
    id: 'dummy_1',
    title: "Major Healthcare Data Breach Exposes 2M Patient Records",
    content: "A sophisticated cyberattack on MedSecure Systems has compromised over 2 million patient records including SSNs, medical histories, and insurance information. The breach was discovered when security researchers found patient data being sold on dark web marketplaces.",
    category: "Incidents",
    user: "HealthSecAnalyst",
    timestamp: "2 hours ago",
    image: "https://picsum.photos/seed/incident1/500/300",
    likes: 45,
    comments: [
      { id: 1, user: "CyberMedic", content: "This is devastating for patient privacy. Healthcare organizations need better security protocols.", replies: [] },
      { id: 2, user: "DataProtector", content: "HIPAA violations this large should result in criminal charges, not just fines.", replies: [] }
    ]
  },
  {
    id: 'dummy_2',
    title: "Ransomware Shuts Down City Infrastructure for 72 Hours",
    content: "The city of Springfield fell victim to a coordinated ransomware attack that encrypted critical systems including traffic lights, emergency services dispatch, and municipal databases. Officials refused to pay the $500,000 Bitcoin ransom demand.",
    category: "Incidents",
    user: "MunicipalSecOps",
    timestamp: "6 hours ago",
    likes: 38,
    comments: [
      { id: 1, user: "EmergencyResponse", content: "We had to go back to paper systems and radio dispatch. It was chaotic but we managed.", replies: [] }
    ]
  },
  {
    id: 'dummy_3',
    title: "Supply Chain Attack Compromises Software Used by 10,000 Companies",
    content: "Attackers infiltrated the build process of SecureCode Solutions, injecting malicious code into their enterprise security software. The backdoor went undetected for 8 months, potentially giving attackers access to thousands of corporate networks.",
    category: "Incidents",
    user: "SupplyChainWatcher",
    timestamp: "12 hours ago",
    likes: 52,
    comments: []
  },
  {
    id: 'dummy_4',
    title: "Insider Threat: Employee Sells Customer Database for Cryptocurrency",
    content: "A database administrator at TechCorp was arrested for selling 500,000 customer records to cybercriminals for $50,000 in Bitcoin. The employee had legitimate access but exported data over several weeks to avoid detection.",
    category: "Incidents",
    user: "InsiderThreatHunter",
    timestamp: "1 day ago",
    likes: 29,
    comments: [
      { id: 1, user: "HRSecurityLiaison", content: "This is why we need better employee monitoring and data loss prevention tools.", replies: [] }
    ]
  },
  {
    id: 'dummy_5',
    title: "Zero-Day Exploit Targets Smart Home IoT Devices",
    content: "Security researchers discovered a critical vulnerability in popular smart doorbell firmware that allows attackers to gain root access and spy on homeowners. Over 2 million devices are affected worldwide.",
    category: "Incidents",
    user: "IoTSecurityLab",
    timestamp: "2 days ago",
    image: "https://picsum.photos/seed/incident5/500/300",
    likes: 41,
    comments: []
  },
  {
    id: 'dummy_6',
    title: "Cryptocurrency Exchange Loses $150M in Hot Wallet Hack",
    content: "CryptoVault Exchange reported that attackers exploited a smart contract vulnerability to drain their hot wallets of Bitcoin, Ethereum, and other cryptocurrencies. Trading has been suspended indefinitely.",
    category: "Incidents",
    user: "CryptoSecAnalyst",
    timestamp: "3 days ago",
    likes: 67,
    comments: [
      { id: 1, user: "BlockchainExpert", content: "This is why cold storage is essential for crypto exchanges. Hot wallets should only hold small amounts.", replies: [] }
    ]
  },
  {
    id: 'dummy_7',
    title: "Nation-State APT Group Targets Defense Contractors",
    content: "The FBI issued a warning about an advanced persistent threat group believed to be state-sponsored, targeting aerospace and defense companies with sophisticated spear-phishing campaigns and custom malware.",
    category: "Incidents",
    user: "APTTracker",
    timestamp: "4 days ago",
    likes: 33,
    comments: []
  },

  // BLOGS CATEGORY
  {
    id: 'dummy_8',
    title: "My Journey from Marketing to Cybersecurity: Lessons Learned",
    content: "After 5 years in marketing, I made the switch to cybersecurity at age 30. Here's what I wish I knew before starting, the challenges I faced as a career changer, and how I landed my first SOC analyst role.",
    category: "Blogs",
    user: "CareerChanger2023",
    timestamp: "3 hours ago",
    likes: 78,
    comments: [
      { id: 1, user: "MarketingToSec", content: "Thank you for sharing this! I'm considering the same transition and this gives me hope.", replies: [] },
      { id: 2, user: "SOCManager", content: "Career changers often bring valuable perspectives. Your marketing background probably helps with security awareness training.", replies: [] }
    ]
  },
  {
    id: 'dummy_9',
    title: "Building a Home Cybersecurity Lab on a $500 Budget",
    content: "Step-by-step guide to setting up a practical cybersecurity lab using old hardware, VirtualBox, and free security tools. Perfect for hands-on learning without breaking the bank.",
    category: "Blogs",
    user: "BudgetLabBuilder",
    timestamp: "8 hours ago",
    image: "https://picsum.photos/seed/blog2/500/300",
    likes: 92,
    comments: [
      { id: 1, user: "StudentHacker", content: "This is exactly what I needed! Can't afford expensive lab setups but want to practice.", replies: [] }
    ]
  },
  {
    id: 'dummy_10',
    title: "How I Passed CISSP on My First Attempt (Study Plan Included)",
    content: "After 6 months of dedicated study, I passed the CISSP exam. Here's my detailed study plan, recommended resources, and tips for managing exam anxiety. Free study schedule template included!",
    category: "Blogs",
    user: "CISSPSuccess",
    timestamp: "1 day ago",
    likes: 156,
    comments: [
      { id: 1, user: "ExamPrepper", content: "Downloading your study template now! How many hours per week did you dedicate?", replies: [] }
    ]
  },
  {
    id: 'dummy_11',
    title: "Dealing with Impostor Syndrome in Cybersecurity",
    content: "As one of the few women in my cybersecurity team, impostor syndrome hit hard. Here's how I overcame self-doubt, found my voice in meetings, and learned to celebrate my achievements.",
    category: "Blogs",
    user: "ConfidentCyberWoman",
    timestamp: "2 days ago",
    likes: 134,
    comments: [
      { id: 1, user: "WomenInCyber", content: "Thank you for being vulnerable about this. So many of us struggle with these feelings but don't talk about it.", replies: [] }
    ]
  },
  {
    id: 'dummy_12',
    title: "Red Team vs Blue Team: Which Path Should You Choose?",
    content: "Confused about offensive vs defensive cybersecurity careers? I've worked on both sides and here's my honest comparison of daily responsibilities, career growth, and which personality types thrive in each role.",
    category: "Blogs",
    user: "PurpleTeamVet",
    timestamp: "3 days ago",
    likes: 87,
    comments: []
  },
  {
    id: 'dummy_13',
    title: "Work-Life Balance in Cybersecurity: Myth or Reality?",
    content: "After burning out twice in SOC roles, I learned how to set boundaries, manage on-call stress, and prioritize mental health. Yes, you can have a life outside of security alerts!",
    category: "Blogs",
    user: "BalancedSecPro",
    timestamp: "4 days ago",
    likes: 203,
    comments: [
      { id: 1, user: "BurnoutRecovery", content: "I needed to read this today. The 24/7 nature of cybersecurity can be overwhelming.", replies: [] }
    ]
  },
  {
    id: 'dummy_14',
    title: "Teaching Cybersecurity to Kids: A Parent's Guide",
    content: "How to explain online safety, password security, and digital privacy to children ages 5-15. Includes fun activities, age-appropriate explanations, and free resources for families.",
    category: "Blogs",
    user: "CyberParent",
    timestamp: "5 days ago",
    image: "https://picsum.photos/seed/blog7/500/300",
    likes: 95,
    comments: []
  },

  // ARTICLES CATEGORY
  {
    id: 'dummy_15',
    title: "The State of Women in Cybersecurity 2025: Progress Report",
    content: "Comprehensive analysis of gender representation in cybersecurity roles, salary disparities, leadership positions, and emerging trends. Based on survey data from 10,000+ professionals across 50 countries.",
    category: "Articles",
    user: "GenderEquityResearcher",
    timestamp: "4 hours ago",
    likes: 189,
    comments: [
      { id: 1, user: "DiversityAdvocate", content: "The progress is encouraging but we still have so far to go. Thanks for the detailed analysis.", replies: [] }
    ]
  },
  {
    id: 'dummy_16',
    title: "Quantum Computing Threats to Current Encryption Standards",
    content: "Technical deep-dive into how quantum computers will break RSA and ECC encryption, timeline predictions for quantum supremacy, and post-quantum cryptography solutions organizations should implement now.",
    category: "Articles",
    user: "QuantumCryptographer",
    timestamp: "7 hours ago",
    likes: 124,
    comments: []
  },
  {
    id: 'dummy_17',
    title: "Zero Trust Architecture: Implementation Roadmap for SMBs",
    content: "Practical guide for small and medium businesses to implement zero trust security principles without enterprise budgets. Includes vendor comparisons, cost analysis, and phased deployment strategies.",
    category: "Articles",
    user: "SMBSecurityConsultant",
    timestamp: "10 hours ago",
    image: "https://picsum.photos/seed/article3/500/300",
    likes: 76,
    comments: [
      { id: 1, user: "SMBOwner", content: "Finally, zero trust advice that's actually applicable to businesses our size!", replies: [] }
    ]
  },
  {
    id: 'dummy_18',
    title: "AI-Powered Cybersecurity: Hype vs Reality in 2025",
    content: "Objective evaluation of artificial intelligence applications in cybersecurity, successful use cases, current limitations, and predictions for the next 5 years. Cuts through vendor marketing to real-world performance.",
    category: "Articles",
    user: "AISecurityAnalyst",
    timestamp: "1 day ago",
    likes: 145,
    comments: []
  },
  {
    id: 'dummy_19',
    title: "Cybersecurity Insurance: What Every Business Needs to Know",
    content: "Complete guide to cyber insurance policies, coverage gaps to avoid, claims process realities, and how to reduce premiums through security improvements. Includes real case studies and claim examples.",
    category: "Articles",
    user: "CyberInsuranceExpert",
    timestamp: "2 days ago",
    likes: 98,
    comments: [
      { id: 1, user: "RiskManager", content: "The claims process section was eye-opening. Our current policy has huge gaps we didn't realize.", replies: [] }
    ]
  },
  {
    id: 'dummy_20',
    title: "Supply Chain Security: Lessons from Recent Attacks",
    content: "Analysis of major supply chain compromises including SolarWinds, Kaseya, and Log4j incidents. Common attack vectors, detection strategies, and vendor risk assessment frameworks.",
    category: "Articles",
    user: "SupplyChainAnalyst",
    timestamp: "3 days ago",
    likes: 167,
    comments: []
  },
  {
    id: 'dummy_21',
    title: "The Psychology of Social Engineering: Why Humans Are the Weakest Link",
    content: "Research-backed exploration of cognitive biases that make social engineering effective, real-world attack examples, and evidence-based training approaches that actually change behavior.",
    category: "Articles",
    user: "PsychoSecurityResearcher",
    timestamp: "4 days ago",
    likes: 201,
    comments: [
      { id: 1, user: "SecurityTrainer", content: "This explains why traditional awareness training fails. The psychological insights are fascinating.", replies: [] }
    ]
  },

  // NEWS FEED CATEGORY
  {
    id: 'dummy_22',
    title: "Microsoft Patches Critical Zero-Day Exploited in the Wild",
    content: "Emergency patch released for CVE-2025-0123 affecting Windows 11 and Server 2022. Active exploitation detected targeting government and financial organizations. Patch immediately.",
    category: "News Feed",
    user: "PatchTuesdayAlert",
    timestamp: "1 hour ago",
    likes: 234,
    comments: [
      { id: 1, user: "SysAdmin", content: "Patching our production servers now. Thanks for the heads up!", replies: [] }
    ]
  },
  {
    id: 'dummy_23',
    title: "FBI Arrests International Ransomware Gang Leader",
    content: "The alleged leader of the BlackCat ransomware group was arrested in Romania following a joint international operation. The group is responsible for over $100M in ransom payments.",
    category: "News Feed",
    user: "CyberCrimeNews",
    timestamp: "3 hours ago",
    likes: 187,
    comments: []
  },
  {
    id: 'dummy_24',
    title: "New EU Cyber Resilience Act Takes Effect",
    content: "European Union's sweeping cybersecurity legislation now requires security-by-design for all IoT devices and software sold in EU markets. Compliance deadline is January 2026.",
    category: "News Feed",
    user: "RegulatoryUpdate",
    timestamp: "5 hours ago",
    image: "https://picsum.photos/seed/news3/500/300",
    likes: 143,
    comments: [
      { id: 1, user: "ComplianceManager", content: "Our legal team is scrambling to understand the full implications for our products.", replies: [] }
    ]
  },
  {
    id: 'dummy_25',
    title: "CISA Adds 15 New CVEs to Known Exploited Vulnerabilities Catalog",
    content: "Federal agencies have 21 days to patch newly identified vulnerabilities with evidence of active exploitation. Includes critical flaws in popular enterprise software.",
    category: "News Feed",
    user: "CISAWatcher",
    timestamp: "8 hours ago",
    likes: 156,
    comments: []
  },
  {
    id: 'dummy_26',
    title: "Google Chrome 130 Fixes 23 Security Vulnerabilities",
    content: "Latest Chrome update patches high-severity memory corruption bugs and updates V8 JavaScript engine. Auto-update is rolling out globally over the next 48 hours.",
    category: "News Feed",
    user: "BrowserSecurityNews",
    timestamp: "12 hours ago",
    likes: 98,
    comments: []
  },
  {
    id: 'dummy_27',
    title: "OpenAI Launches Bug Bounty Program with $20,000 Maximum Payout",
    content: "AI company expands security research program to cover ChatGPT, GPT-4, and API infrastructure. Focuses on prompt injection, data leakage, and model manipulation vulnerabilities.",
    category: "News Feed",
    user: "AISecurityNews",
    timestamp: "1 day ago",
    likes: 176,
    comments: [
      { id: 1, user: "BugBountyHunter", content: "Time to test some prompt injection techniques on their models!", replies: [] }
    ]
  },
  {
    id: 'dummy_28',
    title: "Record $2.3 Billion in Cybercrime Losses Reported to FBI in 2024",
    content: "IC3 annual report shows 15% increase in cybercrime complaints, with business email compromise and ransomware leading financial losses. Senior citizens most targeted demographic.",
    category: "News Feed",
    user: "CybercrimeStats",
    timestamp: "2 days ago",
    likes: 167,
    comments: []
  },

  // TOOLS CATEGORY
  {
    id: 'dummy_29',
    title: "Nmap 8.5 Released with Enhanced Service Detection",
    content: "Latest version includes improved fingerprinting for cloud services, better IPv6 support, and new NSE scripts for modern web applications. Performance improvements reduce scan times by 30%.",
    category: "Tools",
    user: "NetworkScanner",
    timestamp: "5 hours ago",
    likes: 245,
    comments: [
      { id: 1, user: "PentesterPro", content: "The new web app scripts are game-changers for reconnaissance. Already found several interesting endpoints.", replies: [] }
    ]
  },
  {
    id: 'dummy_30',
    title: "Wireshark 4.5: New Features for Modern Network Analysis",
    content: "Major update adds native support for HTTP/3, improved TLS 1.3 decryption, and machine learning-based traffic classification. GUI refresh makes it more beginner-friendly.",
    category: "Tools",
    user: "PacketAnalyst",
    timestamp: "9 hours ago",
    image: "https://picsum.photos/seed/tools2/500/300",
    likes: 198,
    comments: []
  },
  {
    id: 'dummy_31',
    title: "10 Essential VS Code Extensions for Security Professionals",
    content: "Curated list of must-have extensions for security research, including secret scanners, code analysis tools, and forensics helpers. Transform your IDE into a security toolkit.",
    category: "Tools",
    user: "DevSecTools",
    timestamp: "13 hours ago",
    likes: 178,
    comments: [
      { id: 1, user: "CodeSecurityAnalyst", content: "The GitLeaks extension has saved me from committing secrets multiple times!", replies: [] }
    ]
  },
  {
    id: 'dummy_32',
    title: "OWASP ZAP Releases GraphQL Security Scanner",
    content: "New plugin provides comprehensive GraphQL API security testing including introspection attacks, injection testing, and authorization bypass detection. Available in ZAP marketplace.",
    category: "Tools",
    user: "WebAppSecTester",
    timestamp: "1 day ago",
    likes: 134,
    comments: []
  },
  {
    id: 'dummy_33',
    title: "Burp Suite 2025.1: AI-Assisted Vulnerability Analysis",
    content: "Professional edition now includes machine learning models trained on millions of web app vulnerabilities. Reduces false positives by 40% and suggests exploitation techniques.",
    category: "Tools",
    user: "WebSecurityTester",
    timestamp: "2 days ago",
    likes: 267,
    comments: [
      { id: 1, user: "AppSecConsultant", content: "The AI suggestions are surprisingly accurate. It's like having a senior consultant reviewing every finding.", replies: [] }
    ]
  },
  {
    id: 'dummy_34',
    title: "Free Kubernetes Security Scanner Released by Aqua Security",
    content: "Open-source tool scans K8s clusters for misconfigurations, vulnerable images, and compliance violations. Integrates with CI/CD pipelines and provides actionable remediation guidance.",
    category: "Tools",
    user: "CloudSecurityEngineer",
    timestamp: "3 days ago",
    likes: 189,
    comments: []
  },
  {
    id: 'dummy_35',
    title: "Metasploit Framework 6.4 Adds Exploit Automation Features",
    content: "New autopwn modules intelligently chain exploits, improved payload evasion techniques, and expanded post-exploitation modules for cloud environments. Educational license remains free.",
    category: "Tools",
    user: "PenetrationTester",
    timestamp: "4 days ago",
    likes: 223,
    comments: [
      { id: 1, user: "RedTeamOperator", content: "The automation features are perfect for large-scale assessments. Saves hours of manual work.", replies: [] }
    ]
  },

  // SOCIAL MEDIA SECURITY CATEGORY
  {
    id: 'dummy_36',
    title: "Instagram's New Privacy Features: What Actually Protects You",
    content: "Deep dive into Instagram's latest privacy updates including end-to-end encrypted DMs, story sharing controls, and location privacy settings. What works and what doesn't.",
    category: "Social Media Security",
    user: "SocialPrivacyExpert",
    timestamp: "6 hours ago",
    likes: 312,
    comments: [
      { id: 1, user: "PrivacyAdvocate", content: "The location tracking is still too aggressive even with privacy mode enabled. Thanks for testing this thoroughly.", replies: [] }
    ]
  },
  {
    id: 'dummy_37',
    title: "LinkedIn Phishing Scams Target Job Seekers with Fake Offers",
    content: "Sophisticated campaigns use cloned company profiles and realistic job postings to steal credentials and personal information. Learn to spot the red flags and protect your job search.",
    category: "Social Media Security",
    user: "CareerSecurityGuard",
    timestamp: "11 hours ago",
    image: "https://picsum.photos/seed/social2/500/300",
    likes: 256,
    comments: [
      { id: 1, user: "JobSeeker2025", content: "Almost fell for one of these last week. The fake recruiter was very convincing.", replies: [] }
    ]
  },
  {
    id: 'dummy_38',
    title: "TikTok Data Collection: What the App Really Knows About You",
    content: "Technical analysis of TikTok's data harvesting practices, including device fingerprinting, location tracking, and contact list access. How to minimize data exposure while using the app.",
    category: "Social Media Security",
    user: "MobilePrivacyResearcher",
    timestamp: "15 hours ago",
    likes: 423,
    comments: []
  },
  {
    id: 'dummy_39',
    title: "Secure Your Twitter/X Account: 2025 Security Checklist",
    content: "Complete guide to locking down your X account including hardware security keys, app permissions audit, and protecting against account takeovers. Essential after recent platform changes.",
    category: "Social Media Security",
    user: "TwitterSecurityGuide",
    timestamp: "1 day ago",
    likes: 187,
    comments: [
      { id: 1, user: "SocialMediaManager", content: "The app permissions section was eye-opening. Revoked access to 20+ apps I forgot about.", replies: [] }
    ]
  },
  {
    id: 'dummy_40',
    title: "Facebook Marketplace Scams: Protect Yourself When Buying/Selling",
    content: "Common fraud tactics on Facebook Marketplace including fake payment confirmations, shipping scams, and identity theft attempts. Safety tips for secure transactions.",
    category: "Social Media Security",
    user: "MarketplaceSafety",
    timestamp: "2 days ago",
    likes: 298,
    comments: []
  },
  {
    id: 'dummy_41',
    title: "WhatsApp Business Impersonation Attacks on the Rise",
    content: "Scammers create fake business accounts to steal payment information and personal data. How to verify legitimate businesses and avoid common WhatsApp fraud schemes.",
    category: "Social Media Security",
    user: "MessagingSecurityExpert",
    timestamp: "3 days ago",
    likes: 234,
    comments: [
      { id: 1, user: "SmallBusinessOwner", content: "Customers have been asking how to verify our official WhatsApp. This guide helps!", replies: [] }
    ]
  },
  {
    id: 'dummy_42',
    title: "Discord Server Security: Admin Best Practices Guide",
    content: "Comprehensive security guide for Discord server administrators including bot permissions, member verification, anti-raid measures, and handling of sensitive community discussions.",
    category: "Social Media Security",
    user: "DiscordSecurityAdmin",
    timestamp: "4 days ago",
    likes: 145,
    comments: []
  },

  // RECENT THREATS CATEGORY
  {
    id: 'dummy_43',
    title: "New 'StealthPipe' Malware Uses Named Pipes for Persistence",
    content: "Advanced malware family discovered using Windows named pipes for command and control communication, making detection extremely difficult. Targets financial services and government agencies.",
    category: "Recent Threats",
    user: "MalwareHunter",
    timestamp: "2 hours ago",
    likes: 178,
    comments: [
      { id: 1, user: "EndpointDefender", content: "Our EDR tools completely missed this. The named pipe technique is brilliant and terrifying.", replies: [] }
    ]
  },
  {
    id: 'dummy_44',
    title: "AI-Generated Phishing Emails Bypass Traditional Filters",
    content: "Cybercriminals using GPT-4 to create highly convincing phishing emails with perfect grammar and contextual relevance. Traditional email security solutions show 60% detection rate drop.",
    category: "Recent Threats",
    user: "PhishingResearcher",
    timestamp: "7 hours ago",
    image: "https://picsum.photos/seed/threat2/500/300",
    likes: 267,
    comments: []
  },
  {
    id: 'dummy_45',
    title: "Supply Chain Attack Targets Python Package Repository",
    content: "Malicious packages discovered in PyPI with names similar to popular libraries. Code injection occurs during package installation, affecting development environments globally.",
    category: "Recent Threats",
    user: "OpenSourceSecurityWatch",
    timestamp: "14 hours ago",
    likes: 189,
    comments: [
      { id: 1, user: "PythonDeveloper", content: "This is scary. We need better package verification in our CI/CD pipeline.", replies: [] }
    ]
  },
  {
    id: 'dummy_46',
    title: "Deepfake Voice Attacks Target C-Suite Executives",
    content: "Sophisticated social engineering campaigns using AI-generated voice clones of CEOs and CFOs to authorize fraudulent wire transfers. Several successful attacks reported in past month.",
    category: "Recent Threats",
    user: "VoiceSecurityExpert",
    timestamp: "18 hours ago",
    likes: 345,
    comments: [
      { id: 1, user: "CFOSecurity", content: "We're implementing voice verification protocols after reading this. The audio samples are terrifyingly realistic.", replies: [] }
    ]
  },
  {
    id: 'dummy_47',
    title: "Ransomware Group Develops Mac-Specific Variant",
    content: "First macOS-native ransomware seen in years targets creative professionals and video production companies. Uses legitimate Apple developer certificates to bypass Gatekeeper protection.",
    category: "Recent Threats",
    user: "MacSecurityAnalyst",
    timestamp: "1 day ago",
    likes: 234,
    comments: []
  },
  {
    id: 'dummy_48',
    title: "QR Code Phishing Campaigns Spike 400% in Q4 2024",
    content: "Attackers placing malicious QR codes in public spaces and email attachments to steal credentials and install malware. Mobile users particularly vulnerable to these 'quishing' attacks.",
    category: "Recent Threats",
    user: "MobileSecurityResearcher",
    timestamp: "2 days ago",
    likes: 198,
    comments: [
      { id: 1, user: "MobileSecurity", content: "The parking meter QR code scam in downtown was particularly clever. Always verify the source!", replies: [] }
    ]
  },
  {
    id: 'dummy_49',
    title: "State-Sponsored Group Exploits Zero-Day in Network Appliances",
    content: "APT29 (Cozy Bear) discovered exploiting previously unknown vulnerability in enterprise firewall management interfaces. Patch not yet available from vendor. Disconnect management interfaces from internet immediately.",
    category: "Recent Threats",
    user: "APTIntelligence",
    timestamp: "3 days ago",
    likes: 423,
    comments: [
      { id: 1, user: "NetworkDefender", content: "Just isolated our management network. This is a nightmare scenario for SOC teams.", replies: [] }
    ]
  }
];

const ForumPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [databasePosts, setDatabasePosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);
  const [myPostCount, setMyPostCount] = useState(0);

  // Fetch all posts from database when component loads
  useEffect(() => {
    fetchAllPosts();
    fetchUserPosts();
    console.log('ForumPage mounted');
  }, [isAuthenticated]);

  // Fetch user's posts when "My Posts" category is selected
  useEffect(() => {
    if (selectedCategory === 'myPosts' && isAuthenticated) {
      fetchUserPosts();
    }
  }, [selectedCategory, isAuthenticated]);

  // Combine dummy posts with database posts whenever database posts change
  useEffect(() => {
    const combinedPosts = [...databasePosts, ...dummyPostsData];
    // Sort by timestamp (newest first)
    combinedPosts.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.timestamp || 0);
      const timeB = new Date(b.createdAt || b.timestamp || 0);
      return timeB - timeA;
    });
    setAllPosts(combinedPosts);
  }, [databasePosts]);

  // Fetch all posts from the database
  const fetchAllPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/forum/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        // Transform database posts to match your frontend format
        const transformedPosts = result.posts.map(post => ({
          id: post._id || post.id,
          title: post.title,
          content: post.content,
          category: post.category,
          user: post.author?.username || 'Anonymous',
          timestamp: formatTimestamp(post.createdAt),
          likes: post.likes || 0,
          comments: post.comments || [],
          image: post.image || null
        }));
        
        setDatabasePosts(transformedPosts);
      } else {
        console.error('Failed to fetch posts:', result.message);
        setDatabasePosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setDatabasePosts([]);
    }
    setIsLoadingPosts(false);
  };

  const fetchUserPosts = async () => {
    setIsLoadingUserPosts(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/forum/my-posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        const transformedPosts = result.posts.map(post => ({
          id: post._id || post.id,
          title: post.title,
          content: post.content,
          category: post.category,
          user: post.author?.username || user?.username || 'You',
          timestamp: formatTimestamp(post.createdAt),
          likes: post.likes || 0,
          comments: post.comments || [],
          image: post.image || null
        }));
        
        setUserPosts(transformedPosts);
      } else {
        console.error('Failed to fetch user posts:', result.message);
        setUserPosts([]);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setUserPosts([]);
    }
    setIsLoadingUserPosts(false);
  };

  // Helper function to format timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'just now';
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
      
      return date.toLocaleDateString();
    } catch (error) {
      return 'Unknown time';
    }
  };

  const handlePostCreated = (newPost) => {
    // Add new post to database posts (it will automatically be combined with dummy posts)
    const transformedPost = {
      id: newPost._id || newPost.id,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      user: newPost.author?.username || user?.username || 'You',
      timestamp: 'just now',
      likes: 0,
      comments: [],
      image: newPost.image || null
    };

    setDatabasePosts(prevPosts => [transformedPost, ...prevPosts]);
    
    // Also add to user posts if we're viewing that category
    if (selectedCategory === 'myPosts') {
      setUserPosts(prevUserPosts => [transformedPost, ...prevUserPosts]);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    console.log(action);
  };

  // Filter posts based on selected category
  const getFilteredPosts = () => {
    if (selectedCategory === 'all') {
      return allPosts; // This includes both dummy and database posts
    } else if (selectedCategory === 'myPosts') {
      return userPosts;
    } else {
      // Filter both dummy and database posts by category
      return allPosts.filter(post => post.category === selectedCategory);
    }
  };

  const filteredPosts = getFilteredPosts();

  const getCategoryDisplayName = () => {
    if (selectedCategory === 'all') return 'All Posts';
    if (selectedCategory === 'myPosts') return 'My Posts';
    return categories.find(cat => cat.id === selectedCategory)?.name || 'Posts';
  };

  const getPostCount = (categoryId) => {
    if (categoryId === 'all') return allPosts.length;
    if (categoryId === 'myPosts') return userPosts.length;
    return allPosts.filter(post => post.category === categoryId).length;
  };

  const renderCreatePostButton = () => (
    <div className={styles.createPostPrompt}>
      <div className={styles.createPostCard}>
        <div className={styles.emptyStateIcon}>✍️</div>
        <h3 className={styles.emptyStateTitle}>No posts yet</h3>
        <p className={styles.emptyStateText}>
          You haven't created any posts yet. Share your knowledge and experiences with the community!
        </p>
        <CreatePost onPostCreated={handlePostCreated} />
      </div>
    </div>
  );

  const renderMyPostsContent = () => {
    if (!isAuthenticated) {
      return (
        <div className={styles.authPrompt}>
          <div className={styles.authCard}>
            <div className={styles.authIcon}>🔒</div>
            <h3 className={styles.authTitle}>Login Required</h3>
            <p className={styles.authText}>
              Please login to view and manage your posts.
            </p>
          </div>
        </div>
      );
    }

    if (isLoadingUserPosts) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your posts...</p>
        </div>
      );
    }

    if (userPosts.length === 0) {
      return renderCreatePostButton();
    }

    return (
      <div className={styles.postList}>
        {userPosts.map((post) => (
          <div 
            key={post.id} 
            className={styles.postCard} 
            onClick={() => handlePostClick(post)}
          >
            <div className={styles.postHeader}>
              <div className={styles.userInfo}>
                <img 
                  src="https://avatar.iran.liara.run/public/girl" 
                  alt="User" 
                  className={styles.userProfilePic} 
                />
                <div className={styles.userDetails}>
                  <p className={styles.userName}>{post.user}</p>
                  <span className={styles.postTime}>{post.timestamp}</span>
                </div>
              </div>
              <div className={styles.postMeta}>
                <span className={styles.categoryTag}>{post.category}</span>
                <div className={styles.postOwnerActions}>
                  <button className={styles.editButton} onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit post:', post.id);
                  }}>
                    ✏️
                  </button>
                  <button className={styles.deleteButton} onClick={(e) => {
                    e.stopPropagation();
                    console.log('Delete post:', post.id);
                  }}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
            
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>
            
            {post.image && (
              <img src={post.image} alt="Post" className={styles.postImage} />
            )}
            
            <div className={styles.postActions}>
              <button 
                className={styles.actionButton} 
                onClick={(e) => handleActionClick(e, 'liked')}
              >
                👍 {post.likes || 0}
              </button>
              <button 
                className={styles.actionButton}
                onClick={(e) => handleActionClick(e, 'comment')}
              >
                💬 {post.comments?.length || 0}
              </button>
              <button 
                className={styles.actionButton}
                onClick={(e) => handleActionClick(e, 'share')}
              >
                📤 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.forumPage}>
      <div className={styles.forumContainer}>
        {/* Left Sidebar - Categories */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Categories</h3>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.postCount}>
                    {getPostCount(category.id) > 0 ? `(${getPostCount(category.id)})` : '...'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {/* Add CreatePost component for non-My Posts categories */}
          {selectedCategory !== 'myPosts' && (
            <div className={styles.createPostSection}>
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          )}

          <div className={styles.contentHeader}>
            <h2 className={styles.pageTitle}>
              {getCategoryDisplayName()} ({filteredPosts.length})
              {isLoadingPosts && selectedCategory !== 'myPosts' && (
                <span className={styles.loadingIndicator}> - Loading...</span>
              )}
            </h2>
            {selectedCategory !== 'myPosts' && (
              <div className={styles.sortOptions}>
                <select className={styles.sortSelect}>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="discussed">Most Discussed</option>
                </select>
              </div>
            )}
          </div>

          {/* Render content based on selected category */}
          {selectedCategory === 'myPosts' ? (
            renderMyPostsContent()
          ) : (
            <div className={styles.postList}>
              {isLoadingPosts ? (
                <div className={styles.loadingState}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading posts...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className={styles.postCard} 
                    onClick={() => handlePostClick(post)}
                  >
                    <div className={styles.postHeader}>
                      <div className={styles.userInfo}>
                        <img 
                          src="https://avatar.iran.liara.run/public/girl" 
                          alt="User" 
                          className={styles.userProfilePic} 
                        />
                        <div className={styles.userDetails}>
                          <p className={styles.userName}>{post.user}</p>
                          <span className={styles.postTime}>{post.timestamp}</span>
                        </div>
                      </div>
                      <div className={styles.postMeta}>
                        <span className={styles.categoryTag}>{post.category}</span>
                        <button className={styles.postOptions}>⋯</button>
                      </div>
                    </div>
                    
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postContent}>{post.content}</p>
                    
                    {post.image && (
                      <img src={post.image} alt="Post" className={styles.postImage} />
                    )}
                    
                    <div className={styles.postActions}>
                      <button 
                        className={styles.actionButton} 
                        onClick={(e) => handleActionClick(e, 'liked')}
                      >
                        👍 {post.likes}
                      </button>
                      <button 
                        className={styles.actionButton}
                        onClick={(e) => handleActionClick(e, 'comment')}
                      >
                        💬 {post.comments?.length || 0}
                      </button>
                      <button 
                        className={styles.actionButton}
                        onClick={(e) => handleActionClick(e, 'share')}
                      >
                        📤 Share
                      </button>
                    </div>
                    
                    {/* Display first 2 comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className={styles.comments}>
                        {post.comments.slice(0, 2).map((comment, index) => (
                          <div key={comment.id || index} className={styles.comment}>
                            <strong>{comment.user}:</strong> {comment.content}
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <span className={styles.moreComments}>
                            View all {post.comments.length} comments...
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noPosts}>
                  <p>No posts found in this category.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal for the selected post */}
      {showModal && <PostModal post={selectedPost} onClose={handleModalClose} />}
    </div>
  );
};

export default ForumPage;
