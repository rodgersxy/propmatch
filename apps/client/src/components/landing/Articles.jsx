// src/components/landing/Articles.jsx
    import React from 'react';

    // Placeholder data - in a real app, this would come from a CMS or API
    const posts = [
      {
        imgSrc: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Buying Guide',
        title: '7 Things to Look For When Buying Your First Home in Nairobi',
        excerpt: 'Navigating the vibrant Nairobi real estate market can be tricky. Here are the key factors to consider...'
      },
      {
        imgSrc: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Investment',
        title: 'Is a Vacation Rental in Diani a Good Investment in 2025?',
        excerpt: 'The Kenyan coast is booming. We break down the pros and cons of investing in a holiday home...'
      },
      {
        imgSrc: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Market Trends',
        title: 'How AI is Changing the Game for Kenyan Homebuyers',
        excerpt: 'Learn how smart platforms like PropMatch are making it easier than ever to find the perfect property...'
      },
    ];

    const Articles = () => {
      return (
        <section id="articles" className="bg-white py-16 md:py-4">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral tracking-tight">Latest Articles & Insights</h2>
              <p className="text-neutral/70 mt-3 text-lg">Your expert guide to the Kenyan real estate market.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <div className="overflow-hidden">
                    <img src={post.imgSrc} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-primary mb-2">{post.category}</p>
                    <h3 className="text-xl font-bold text-neutral mb-3">{post.title}</h3>
                    <p className="text-neutral/80 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Articles;