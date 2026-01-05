// LocalStorage utility for managing mock data (Guides, Blogs, Messages)

const STORAGE_KEYS = {
    GUIDES: 'jumatrek_admin_guides',
    BLOGS: 'jumatrek_admin_blogs',
    MESSAGES: 'jumatrek_admin_messages',
};

// Initialize with sample data if not exists
const initializeSampleData = () => {
    // Sample Guides
    if (!localStorage.getItem(STORAGE_KEYS.GUIDES)) {
        const sampleGuides = [
            {
                id: '1',
                name: 'Pemba Sherpa',
                photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
                experience: 15,
                specialization: ['Everest Region', 'High Altitude', 'Mountaineering'],
                languages: ['English', 'Nepali', 'Tibetan'],
                bio: 'Experienced mountain guide with over 15 years of leading treks in the Everest region. Summited Everest 8 times.',
                certifications: ['IFMGA Mountain Guide', 'Wilderness First Responder', 'Avalanche Safety Level 3'],
                rating: 4.9,
                totalTrips: 250,
                status: 'active',
                createdAt: new Date('2020-01-15').toISOString(),
            },
            {
                id: '2',
                name: 'Lakpa Tamang',
                photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
                experience: 12,
                specialization: ['Annapurna Region', 'Cultural Tours', 'Photography Tours'],
                languages: ['English', 'Nepali', 'Hindi', 'German'],
                bio: 'Passionate about sharing Nepali culture and natural beauty. Specializes in photography-focused treks.',
                certifications: ['Nepal Trekking Guide License', 'First Aid Certified'],
                rating: 4.8,
                totalTrips: 180,
                status: 'active',
                createdAt: new Date('2021-03-20').toISOString(),
            },
            {
                id: '3',
                name: 'Mingma Dorje',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                experience: 10,
                specialization: ['Langtang Region', 'Manaslu Circuit', 'Off-the-beaten-path'],
                languages: ['English', 'Nepali'],
                bio: 'Expert in remote trekking routes and sustainable tourism practices.',
                certifications: ['Nepal Trekking Guide License', 'Environmental Conservation Training'],
                rating: 4.7,
                totalTrips: 120,
                status: 'active',
                createdAt: new Date('2022-06-10').toISOString(),
            },
        ];
        localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(sampleGuides));
    }

    // Sample Blogs
    if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
        const sampleBlogs = [
            {
                id: '1',
                title: 'Complete Guide to Everest Base Camp Trek',
                slug: 'complete-guide-everest-base-camp-trek',
                content: '<h2>Introduction</h2><p>The Everest Base Camp trek is one of the most iconic adventures in the world...</p>',
                excerpt: 'Everything you need to know about trekking to Everest Base Camp, from preparation to what to expect on the trail.',
                featuredImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                author: 'Admin',
                category: 'Destination Guide',
                tags: ['Everest', 'Trekking', 'Nepal', 'High Altitude'],
                status: 'published',
                publishedAt: new Date('2024-12-01').toISOString(),
                views: 1250,
                createdAt: new Date('2024-11-25').toISOString(),
                updatedAt: new Date('2024-12-01').toISOString(),
            },
            {
                id: '2',
                title: '10 Essential Tips for First-Time Trekkers in Nepal',
                slug: '10-essential-tips-first-time-trekkers-nepal',
                content: '<h2>Tip 1: Physical Preparation</h2><p>Start training at least 2-3 months before your trek...</p>',
                excerpt: 'Planning your first trek in Nepal? Here are 10 essential tips to make your adventure safe and enjoyable.',
                featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                author: 'Admin',
                category: 'Trekking Tips',
                tags: ['Beginner', 'Tips', 'Preparation', 'Nepal'],
                status: 'published',
                publishedAt: new Date('2024-11-15').toISOString(),
                views: 890,
                createdAt: new Date('2024-11-10').toISOString(),
                updatedAt: new Date('2024-11-15').toISOString(),
            },
            {
                id: '3',
                title: 'Best Time to Trek in the Annapurna Region',
                slug: 'best-time-trek-annapurna-region',
                content: '<h2>Spring Season (March-May)</h2><p>Spring is one of the best times to trek in Annapurna...</p>',
                excerpt: 'Discover the best seasons for trekking in the Annapurna region and what to expect during each time of year.',
                featuredImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
                author: 'Admin',
                category: 'Seasonal Guide',
                tags: ['Annapurna', 'Seasons', 'Weather', 'Planning'],
                status: 'draft',
                publishedAt: null,
                views: 0,
                createdAt: new Date('2025-01-02').toISOString(),
                updatedAt: new Date('2025-01-02').toISOString(),
            },
        ];
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(sampleBlogs));
    }

    // Sample Messages
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
        const sampleMessages = [
            {
                id: '1',
                name: 'John Smith',
                email: 'john.smith@example.com',
                phone: '+1-555-0123',
                subject: 'Inquiry about Everest Base Camp Trek',
                message: 'Hi, I am interested in booking the Everest Base Camp trek for March 2025. Could you provide more information about group sizes and what is included in the package?',
                status: 'new',
                createdAt: new Date('2025-01-05').toISOString(),
                readAt: null,
                repliedAt: null,
                notes: '',
            },
            {
                id: '2',
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '+44-20-1234-5678',
                subject: 'Custom Trek Request',
                message: 'I would like to organize a custom trek for a group of 8 people. We are interested in off-the-beaten-path routes in the Langtang region. Please contact me to discuss options.',
                status: 'read',
                createdAt: new Date('2025-01-04').toISOString(),
                readAt: new Date('2025-01-04T10:30:00').toISOString(),
                repliedAt: null,
                notes: 'Interested in custom 10-day trek, budget flexible',
            },
            {
                id: '3',
                name: 'Michael Chen',
                email: 'mchen@example.com',
                phone: '+86-138-0000-0000',
                subject: 'Question about Altitude Sickness',
                message: 'I have some concerns about altitude sickness as I will be trekking for the first time at high altitude. What precautions do you recommend?',
                status: 'replied',
                createdAt: new Date('2025-01-03').toISOString(),
                readAt: new Date('2025-01-03T14:20:00').toISOString(),
                repliedAt: new Date('2025-01-03T16:45:00').toISOString(),
                notes: 'Sent detailed altitude sickness prevention guide',
            },
            {
                id: '4',
                name: 'Emma Wilson',
                email: 'emma.w@example.com',
                phone: '+61-2-9876-5432',
                subject: 'Booking Confirmation',
                message: 'I have completed the payment for the Annapurna Circuit trek starting February 15th. Please confirm my booking.',
                status: 'archived',
                createdAt: new Date('2025-01-02').toISOString(),
                readAt: new Date('2025-01-02T09:15:00').toISOString(),
                repliedAt: new Date('2025-01-02T11:30:00').toISOString(),
                notes: 'Booking confirmed, sent confirmation email with itinerary',
            },
        ];
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(sampleMessages));
    }
};

// Initialize sample data on module load
initializeSampleData();

// CRUD operations for Guides
export const guidesStorage = {
    getAll() {
        const data = localStorage.getItem(STORAGE_KEYS.GUIDES);
        return data ? JSON.parse(data) : [];
    },

    getById(id) {
        const guides = this.getAll();
        return guides.find(guide => guide.id === id);
    },

    create(guide) {
        const guides = this.getAll();
        const newGuide = {
            ...guide,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        guides.push(newGuide);
        localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
        return newGuide;
    },

    update(id, updatedGuide) {
        const guides = this.getAll();
        const index = guides.findIndex(guide => guide.id === id);
        if (index !== -1) {
            guides[index] = { ...guides[index], ...updatedGuide };
            localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
            return guides[index];
        }
        return null;
    },

    delete(id) {
        const guides = this.getAll();
        const filtered = guides.filter(guide => guide.id !== id);
        localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(filtered));
        return true;
    },
};

// CRUD operations for Blogs
export const blogsStorage = {
    getAll() {
        const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
        return data ? JSON.parse(data) : [];
    },

    getById(id) {
        const blogs = this.getAll();
        return blogs.find(blog => blog.id === id);
    },

    getBySlug(slug) {
        const blogs = this.getAll();
        return blogs.find(blog => blog.slug === slug);
    },

    create(blog) {
        const blogs = this.getAll();
        const newBlog = {
            ...blog,
            id: Date.now().toString(),
            slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0,
        };
        blogs.push(newBlog);
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        return newBlog;
    },

    update(id, updatedBlog) {
        const blogs = this.getAll();
        const index = blogs.findIndex(blog => blog.id === id);
        if (index !== -1) {
            blogs[index] = {
                ...blogs[index],
                ...updatedBlog,
                updatedAt: new Date().toISOString(),
            };
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
            return blogs[index];
        }
        return null;
    },

    delete(id) {
        const blogs = this.getAll();
        const filtered = blogs.filter(blog => blog.id !== id);
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(filtered));
        return true;
    },

    incrementViews(id) {
        const blogs = this.getAll();
        const index = blogs.findIndex(blog => blog.id === id);
        if (index !== -1) {
            blogs[index].views = (blogs[index].views || 0) + 1;
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        }
    },
};

// CRUD operations for Messages
export const messagesStorage = {
    getAll() {
        const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
        return data ? JSON.parse(data) : [];
    },

    getById(id) {
        const messages = this.getAll();
        return messages.find(message => message.id === id);
    },

    create(message) {
        const messages = this.getAll();
        const newMessage = {
            ...message,
            id: Date.now().toString(),
            status: 'new',
            createdAt: new Date().toISOString(),
            readAt: null,
            repliedAt: null,
            notes: '',
        };
        messages.unshift(newMessage); // Add to beginning
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
        return newMessage;
    },

    update(id, updatedMessage) {
        const messages = this.getAll();
        const index = messages.findIndex(message => message.id === id);
        if (index !== -1) {
            messages[index] = { ...messages[index], ...updatedMessage };
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
            return messages[index];
        }
        return null;
    },

    delete(id) {
        const messages = this.getAll();
        const filtered = messages.filter(message => message.id !== id);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
        return true;
    },

    markAsRead(id) {
        return this.update(id, {
            status: 'read',
            readAt: new Date().toISOString(),
        });
    },

    markAsReplied(id) {
        return this.update(id, {
            status: 'replied',
            repliedAt: new Date().toISOString(),
        });
    },

    archive(id) {
        return this.update(id, {
            status: 'archived',
        });
    },
};

export default {
    guidesStorage,
    blogsStorage,
    messagesStorage,
};
