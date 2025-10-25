import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Handle scroll to update active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigation = [
    { id: 'overview', label: 'Overview', icon: '📚' },
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'textarea', label: 'Text Area', icon: '📝' },
    { id: 'email', label: 'Email', icon: '📝' },
    { id: 'number', label: 'Number', icon: '🔢' },
    { id: 'link', label: 'Link', icon: '🔗' },
    { id: 'select', label: 'Select', icon: '📋' },
    { id: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { id: 'radio', label: 'Radio', icon: '🔘' },
    { id: 'toggle', label: 'Toggle', icon: '🔄' },
    { id: 'color', label: 'Color', icon: '🎨' },
    { id: 'range', label: 'Range', icon: '📏' },
    { id: 'date', label: 'Date', icon: '📅' },
    { id: 'file', label: 'File', icon: '📎' },
    { id: 'wysiwyg', label: 'WYSIWYG', icon: '✏️' },
    { id: 'oembed', label: 'oEmbed', icon: '🎬' },
    { id: 'relationship', label: 'Relationship', icon: '🔗' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'repeater', label: 'Repeater', icon: '🔄', isPro: true },
    { id: 'gallery', label: 'Gallery', icon: '🖼️', isPro: true },
    { id: 'conditional-logic', label: 'Conditional Logic', icon: '🎯' },
    { id: 'import-export', label: 'Import & Export', icon: '📦' },
    { id: 'field-visualization', label: 'Field Visualization', icon: '🌳', isPro: true },
    { id: 'ai-generation', label: 'AI Component Generation', icon: '🤖', isPro: true },
    { id: 'complete-example', label: 'Complete Example', icon: '📋' },
    { id: 'best-practices', label: 'Best Practices', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-8 to-n-7"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-color-1/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <Header />

      <div className="relative z-10 px-4 py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="fixed top-32 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-n-1 mb-4 uppercase tracking-wider">On This Page</h3>
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                          activeSection === item.id
                            ? 'bg-color-1/20 text-color-1 font-medium'
                            : 'text-n-3 hover:text-n-1 hover:bg-n-7/50'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        {item.isPro && (
                          <span className="text-[10px] bg-gradient-to-r from-color-1 to-purple-500 text-white px-2 py-0.5 rounded-full font-semibold">
                            PRO
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-6 pt-6 border-t border-n-6">
                    <Link to="/" className="text-n-3 hover:text-n-1 transition-colors text-sm flex items-center gap-2">
                      <span>←</span>
                      <span>Back to Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Header Section */}
              <section id="overview" className="mb-16">
                <h1 className="text-5xl font-bold text-n-1 mb-6">Documentation</h1>
                <p className="text-xl text-n-2 mb-8">
                  Complete guide to using all available fields in the  component with practical examples.
                </p>
              </section>

              {/* Documentation Sections Container */}
              <div className="space-y-8">
                {/* Text Field */}
                <section id="text" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📝</span>
                    Text Field
                  </h2>
                  <p className="text-n-2 mb-4">Single-line text input for titles, names, and short content.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Text
$title = get_ccc_field('title');

// Usage:
<h1><?php echo esc_html($title); ?></h1>`}</pre>
                  </div>
                </section>

                {/* Text Area Field */}
                <section id="textarea" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📄</span>
                    Text Area Field
                  </h2>
                  <p className="text-n-2 mb-4">Multi-line text input for longer content like descriptions.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Text Area
$text_area = get_ccc_field('text_area');

// Usage:
<p><?php echo esc_html($text_area); ?></p>`}</pre>
                  </div>
                </section>

                {/* Email Field */}
                <section id="email" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📧</span>
                    Email Field
                  </h2>
                  <p className="text-n-2 mb-4">Email input field with built-in validation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Email
$email = get_ccc_field('email');

// Usage:
<p><?php echo esc_html($email); ?></p>`}</pre>
                  </div>
                </section>

                {/* Number Field */}
                <section id="number" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔢</span>
                    Number Field
                  </h2>
                  <p className="text-n-2 mb-4">Numeric input field with validation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Number
$number = get_ccc_field('number');

// Usage:
<p><?php echo esc_html($number); ?></p>`}</pre>
                  </div>
                </section>

                {/* Link Field */}
                <section id="link" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔗</span>
                    Link Field
                  </h2>
                  <p className="text-n-2 mb-4">Create links with target attributes.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Link
$link = get_ccc_field('link');
$link_target = get_ccc_field_target('link');

// Usage:
<a href="<?php echo $link ?>">Normal Link</a>

<a href="<?php echo esc_url($link_target['url']); ?>" 
   <?php echo $link_target['target']; ?> 
   class="btn btn-primary">
    Target Link
</a>`}</pre>
                  </div>
                </section>

                {/* Select Field */}
                <section id="select" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📋</span>
                    Select Field
                  </h2>
                  <p className="text-n-2 mb-4">Dropdown selection for single or multiple choices.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Select
$select = get_ccc_field('select');
$multi_select_list = get_ccc_select_values('select', null, null, 'list');
$multi_select_string = get_ccc_select_values('select', null, null, 'string');
$multi_select_string_array = get_ccc_select_values('select', null, null, 'array');

// Usage:
<p> Single Select : <?php echo $select; ?></p>
<p>Multi Select List : <?php echo $multi_select_list; ?></p>
<p>Multi Select String : <?php echo $multi_select_string; ?></p>

<!-- select through Foreach -->
<select class="form-select">
    <?php foreach ($select as $option): ?>
        <option value="<?php echo esc_attr($option); ?>" 
                <?php selected($layout_style, $option); ?>>
            <?php echo esc_html($option); ?>
        </option>
    <?php endforeach; ?>
</select>`}</pre>
                  </div>
                </section>

                {/* Checkbox Field */}
                <section id="checkbox" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">☑️</span>
                    Checkbox Field
                  </h2>
                  <p className="text-n-2 mb-4">Multiple selection checkboxes.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Checkbox  
$checkbox = get_ccc_field('checkbox');
$checkbox_string = get_ccc_select_values('checkbox', null, null, 'string');
$checkbox_list = get_ccc_select_values('checkbox', null, null, 'list');

// Usage:
<ul class="features-list">
    selected features:
    <?php foreach ($checkbox as $feature): ?>
        <li class="feature-item"><?php echo esc_html($feature); ?></li>
    <?php endforeach; ?>
</ul>

<div>
    checkbox_string
    <?php echo esc_html($checkbox_string); ?>
</div>

<div>
    checkbox_list
    <?php echo ($checkbox_list); ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Radio Field */}
                <section id="radio" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔘</span>
                    Radio Field
                  </h2>
                  <p className="text-n-2 mb-4">Single selection radio buttons.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Radio
$radio = get_ccc_field('radio');

// Usage:
<div>
    Radio
    <?php echo esc_html($radio); ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Toggle Field */}
                <section id="toggle" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔄</span>
                    Toggle Field
                  </h2>
                  <p className="text-n-2 mb-4">Boolean toggle switch for yes/no values.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Toggle
$toggle = get_ccc_field('toggle');

// Usage:
<?php if ($toggle) { ?>
    <section class="p-6">
        <!-- Your content here -->
    </section>
<?php } ?>`}</pre>
                  </div>
                </section>

                {/* Color Field */}
                <section id="color" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🎨</span>
                    Color Field
                  </h2>
                  <p className="text-n-2 mb-4">Color picker with CSS variables support.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// color
$color = get_ccc_field('color');
$main_color = get_ccc_field_color('color');
$hover_color = get_ccc_field_hover_color('color');
$adjusted_color = get_ccc_field_adjusted_color('color');

// Usage:
<h2>Normal Color Through style</h2>
<div class="w-10 h-10 color_field"></div>
<div class="w-10 h-10 adjusted_color"></div>

<style>
    .color_field {
        background-color: <?php echo esc_html($main_color); ?>;
    }

    .color_field:hover {
        background-color: <?php echo esc_html($hover_color); ?>;
    }

    .adjusted_color {
        background-color: <?php echo esc_html($adjusted_color); ?>;
    }

    .adjusted_color:hover {
        background-color: <?php echo esc_html($hover_color); ?>;
    }
</style>`}</pre>
                  </div>
                </section>

                {/* Range Field */}
                <section id="range" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📏</span>
                    Range Field
                  </h2>
                  <p className="text-n-2 mb-4">Slider input for selecting values within a range.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Range
$range = get_ccc_field('range');

// Usage:
<div>
    Range Value: <?php echo ($range); ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Date Field */}
                <section id="date" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📅</span>
                    Date Field
                  </h2>
                  <p className="text-n-2 mb-4">Handle date values for events and scheduling.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Date
$date_value = get_ccc_field('date');

// Usage:
<div>
    Date Value: <?php echo esc_html($date_value); ?>
</div>`}</pre>
                  </div>
                </section>

                {/* File Field */}
                <section id="file" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📎</span>
                    File Field
                  </h2>
                  <p className="text-n-2 mb-4">Upload and manage file downloads.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// File
$file = get_ccc_field('file');

// Usage:
<div>
    <a href="<?php echo $file ?>">Download File</a>
</div>`}</pre>
                  </div>
                </section>

                {/* WYSIWYG Field */}
                <section id="wysiwyg" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">✏️</span>
                    WYSIWYG Editor
                  </h2>
                  <p className="text-n-2 mb-4">Rich text editor with formatting options.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Wiysiwyg Editor
$wysiwyg = get_ccc_field('wysiwyg_editor');

// Usage:
<div>
    <?php echo $wysiwyg; ?>
</div>`}</pre>
                  </div>
                </section>

                {/* oEmbed Field */}
                <section id="oembed" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🎬</span>
                    oEmbed Field
                  </h2>
                  <p className="text-n-2 mb-4">Embed content from external sources (YouTube, Vimeo, etc.).</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Oembedded 
$oembded = get_ccc_field('oembded');

// Usage:
<div>
    <?php echo $oembded; ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Relationship Field */}
                <section id="relationship" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔗</span>
                    Relationship Field
                  </h2>
                  <p className="text-n-2 mb-4">Select and relate to other WordPress posts, pages, or custom post types.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Realtionship
$related_posts = get_ccc_field('realtionship');

// Usage:
<div class="related-posts">
    <?php foreach ($related_posts as $post_id): ?>
        <?php $post = get_post($post_id); ?>
        <article class="related-post">
            <h3><a href="<?php echo get_permalink($post); ?>">
                <?php echo esc_html($post->post_title); ?></a></h3>
            <p><?php echo esc_html(get_the_excerpt($post)); ?></p>
        </article>
    <?php endforeach; ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Image Field */}
                <section id="image" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🖼️</span>
                    Image Field
                  </h2>
                  <p className="text-n-2 mb-4">Upload and display images.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Image
$image = get_ccc_field('image');

// Usage:
<img class="w-20 h-20" src="<?php echo $image ?>" alt="">`}</pre>
                  </div>
                </section>

                {/* Video Field */}
                <section id="video" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🎥</span>
                    Video Field
                  </h2>
                  <p className="text-n-2 mb-4">Upload videos with HTML5 player support.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Video
$video = get_ccc_field('video');

// Usage:
<video controls src="<?php echo $video ?>"></video>

// Or using helper function:
<div>
    <?php echo get_ccc_field_video('video'); ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Repeater Field */}
                <section id="repeater" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🔄</span>
                    Repeater Field
                    <span className="ml-3 text-sm bg-gradient-to-r from-color-1 to-purple-500 text-white px-3 py-1 rounded-full">PRO</span>
                  </h2>
                  <p className="text-n-2 mb-4">Create repeatable blocks of fields for flexible content structures.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Repeater
$repeater = get_ccc_field('repeater');

// Usage:
<div>
    <?php if ($repeater): ?>
        <div class="gallery flex gap-2 p-5">
            <?php foreach ($repeater as $idx): ?>
                <div class="flex flex-col">
                    <img src="<?php echo esc_url($idx['image']); ?>" 
                         alt="Gallery Image" 
                         class="gallery-image w-40 h-40" />
                    <h3><?php echo $idx['heading'] ?></h3>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Gallery Field */}
                <section id="gallery" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🖼️</span>
                    Gallery Field
                    <span className="ml-3 text-sm bg-gradient-to-r from-color-1 to-purple-500 text-white px-3 py-1 rounded-full">PRO</span>
                  </h2>
                  <p className="text-n-2 mb-4">Display multiple images in a grid layout.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Gallery
$gallery = get_ccc_field('gallery');

// Usage:
<div class="container">
    <?php if (!empty($gallery) && is_array($gallery)): ?>
        <div class="hero-gallery grid grid-cols-3 gap-4">
            <?php foreach ($gallery as $image): ?>
                <img class="w-full h-[200px] object-cover" 
                     src="<?php echo esc_url($image['url']); ?>"
                     alt="<?php echo esc_attr($image['alt']); ?>">
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>`}</pre>
                  </div>
                </section>

                {/* Conditional Logic Section */}
                <section id="conditional-logic" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🎯</span>
                    Conditional Logic
                  </h2>
                  <p className="text-n-2 mb-6">
                    Control field visibility dynamically based on the values of other fields. 
                    This powerful feature allows you to create intelligent forms that show or hide fields contextually.
                  </p>

                  <div className="space-y-6">
                    {/* Overview */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">How Conditional Logic Works</h3>
                      <p className="text-n-2 mb-4">
                        Conditional logic enables you to show or hide fields based on conditions you define. 
                        Each field can have its own set of rules that determine when it should be visible.
                      </p>
                    </div>

                    {/* Field Condition Types */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Overall Field Condition</h3>
                      <p className="text-n-2 mb-4">Choose how the field behaves:</p>
                      
                      <div className="space-y-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 font-semibold">Always Show:</span>
                            <span className="text-n-2">Field is always visible (default behavior)</span>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 font-semibold">Show When:</span>
                            <span className="text-n-2">Field only appears when specified conditions are met</span>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 font-semibold">Hide When:</span>
                            <span className="text-n-2">Field is hidden when specified conditions are met</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Logic Types */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Logic Type</h3>
                      <p className="text-n-2 mb-4">
                        When you add multiple rules, choose how they should be evaluated:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-color-1 font-semibold">All of the conditions pass (AND):</span>
                          </div>
                          <span className="text-n-2 text-sm">
                            All rules must be true for the condition to be satisfied. 
                            Use this when you need multiple criteria to be met simultaneously.
                          </span>
                          <div className="mt-3 text-n-3 text-xs font-mono bg-n-7 p-2 rounded">
                            Example: Show field when Toggle is Enabled AND Select is "Option A"
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-color-1 font-semibold">Any condition passes (OR):</span>
                          </div>
                          <span className="text-n-2 text-sm">
                            At least one rule must be true for the condition to be satisfied. 
                            Use this when any single criteria should trigger the visibility change.
                          </span>
                          <div className="mt-3 text-n-3 text-xs font-mono bg-n-7 p-2 rounded">
                            Example: Show field when Toggle is Enabled OR Checkbox is checked
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Adding Rules */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Creating Conditional Rules</h3>
                      <p className="text-n-2 mb-4">Each rule consists of three parts:</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                          <div>
                            <span className="text-color-1 font-semibold">Target Field:</span>
                            <span className="text-n-2 ml-2">Select the field you want to check the value of</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                          <div>
                            <span className="text-color-1 font-semibold">Condition:</span>
                            <span className="text-n-2 ml-2">Choose the comparison operator (equals, not equals, contains, etc.)</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                          <div>
                            <span className="text-color-1 font-semibold">Value:</span>
                            <span className="text-n-2 ml-2">Specify the value to compare against</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-n-8 border border-n-6 rounded-lg">
                        <p className="text-n-3 text-sm mb-2">💡 You can add multiple rules by clicking "Add Rule"</p>
                      </div>
                    </div>

                    {/* Practical Example */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Practical Example</h3>
                      <p className="text-n-2 mb-4">
                        Let's say you have a toggle field called "show_advanced_options" and you want to show 
                        additional fields only when this toggle is enabled:
                      </p>
                      
                      <div className="bg-n-8 border border-n-6 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-n-3">Overall Field Condition:</span>
                            <div className="text-color-1 font-semibold">Show when</div>
                          </div>
                          <div>
                            <span className="text-n-3">Logic:</span>
                            <div className="text-color-1 font-semibold">All of the conditions pass</div>
                          </div>
                        </div>
                        
                        <div className="border-t border-n-6 pt-3">
                          <div className="text-n-3 text-sm mb-2">Rule 1:</div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-n-3">Target Field:</span>
                              <div className="text-n-1">show_advanced_options</div>
                            </div>
                            <div>
                              <span className="text-n-3">Condition:</span>
                              <div className="text-n-1">When toggle is</div>
                            </div>
                            <div>
                              <span className="text-n-3">Value:</span>
                              <div className="text-n-1">Enabled</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-n-2 text-sm mt-4">
                        With this configuration, the field will only be visible when the "show_advanced_options" toggle is enabled.
                      </p>
                    </div>

                    {/* Available Conditions */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Available Conditions by Field Type</h3>
                      
                      <div className="space-y-3">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-3">
                          <span className="text-color-1 font-semibold">Toggle Fields:</span>
                          <span className="text-n-2 ml-2 text-sm">Enabled, Disabled</span>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3">
                          <span className="text-color-1 font-semibold">Text/Number Fields:</span>
                          <span className="text-n-2 ml-2 text-sm">Equals, Not Equals, Contains, Greater Than, Less Than</span>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3">
                          <span className="text-color-1 font-semibold">Select/Radio Fields:</span>
                          <span className="text-n-2 ml-2 text-sm">Equals, Not Equals</span>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3">
                          <span className="text-color-1 font-semibold">Checkbox Fields:</span>
                          <span className="text-n-2 ml-2 text-sm">Contains, Does Not Contain</span>
                        </div>
                      </div>
                    </div>

                    {/* Best Practices */}
                    <div className="bg-gradient-to-r from-color-1/10 to-purple-500/10 border border-color-1/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">💡 Tips & Best Practices</h3>
                      <ul className="text-n-2 space-y-2 text-sm">
                        <li>✓ Use conditional logic to simplify complex forms and improve user experience</li>
                        <li>✓ Test all possible combinations to ensure conditions work as expected</li>
                        <li>✓ Avoid creating circular dependencies (Field A depends on Field B, which depends on Field A)</li>
                        <li>✓ Use descriptive field names to make conditional logic rules easier to understand</li>
                        <li>✓ Keep logic simple - overly complex rules can be hard to maintain</li>
                        <li>✓ Document your conditional logic setup for future reference</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Import & Export Section */}
                <section id="import-export" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">📦</span>
                    Import & Export
                  </h2>
                  <p className="text-n-2 mb-6">
                    Easily transfer your components and fields between websites, create backups, or share configurations with your team. 
                    The Import & Export feature provides flexible options to move your entire setup or specific parts with just a few clicks.
                  </p>

                  <div className="space-y-6">
                    {/* Overview */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">What Can You Export?</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🗂️</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Full Component Set</h4>
                              <p className="text-n-2 text-sm">Export all components at once with all their fields, settings, and configurations intact</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📋</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Individual Components</h4>
                              <p className="text-n-2 text-sm">Export specific components one at a time for selective transfers</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📝</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Individual Fields</h4>
                              <p className="text-n-2 text-sm">Export only specific fields from a component for granular control</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⚙️</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Complete Configuration</h4>
                              <p className="text-n-2 text-sm">All settings including conditional logic, validations, and field relationships are preserved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Process */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">How to Export</h3>
                      
                      <div className="space-y-4">
                        {/* Export All Components */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Export All Components
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Navigate to the Import/Export section in the plugin dashboard</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click on the "Export All Components" button</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">A JSON file containing all your components will be downloaded automatically</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">This file includes all fields, settings, conditional logic, and relationships</p>
                            </div>
                          </div>
                        </div>

                        {/* Export Individual Component */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                            Export Individual Component
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Go to the Components list</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Select the component you want to export</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click the "Export Component" button next to the component name</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">The component with all its fields will be exported as a JSON file</p>
                            </div>
                          </div>
                        </div>

                        {/* Export Individual Fields */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                            Export Individual Fields
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Open the component containing the fields you want to export</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Select specific fields from the field list</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click "Export Selected Fields" button</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Only the selected fields with their configurations will be exported</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Import Process */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">How to Import</h3>
                      
                      <div className="space-y-4">
                        {/* Import All Components */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Import Full Component Set
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Navigate to the Import/Export section</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click on "Import Components" button</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Select the JSON file you previously exported</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Review the components that will be imported</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click "Confirm Import" to complete the process</p>
                            </div>
                            <div className="bg-color-1/10 border border-color-1/30 rounded p-3 mt-3">
                              <p className="text-n-2 text-sm">
                                <span className="text-color-1 font-semibold">Note:</span> All components from the file will be imported with their complete configurations
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Import Individual Component */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                            Import Individual Component
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Go to Import/Export section</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Select "Import Component" option</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Upload the component JSON file</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Preview the component structure and fields</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Confirm to add the component to your current site</p>
                            </div>
                          </div>
                        </div>

                        {/* Import Fields to Component */}
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <h4 className="text-lg font-semibold text-color-1 mb-3 flex items-center gap-2">
                            <span className="bg-color-1 text-n-1 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                            Import Fields to Existing Component
                          </h4>
                          <div className="ml-8 space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Open the component where you want to add fields</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click on "Import Fields" button within the component</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Select the JSON file containing the fields</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Choose which fields to import (you can select all or specific ones)</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-color-1 mt-1">→</span>
                              <p className="text-n-2 text-sm">Click "Import" to add the selected fields to your component</p>
                            </div>
                            <div className="bg-color-1/10 border border-color-1/30 rounded p-3 mt-3">
                              <p className="text-n-2 text-sm">
                                <span className="text-color-1 font-semibold">Tip:</span> This is perfect for adding pre-configured fields to existing components without recreating them from scratch
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Common Use Cases</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🌐</span>
                            Multi-Site Deployment
                          </h4>
                          <p className="text-n-2 text-sm">
                            Export components from your development site and import them to staging or production environments for consistent configurations across all sites
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>💾</span>
                            Backup & Recovery
                          </h4>
                          <p className="text-n-2 text-sm">
                            Create regular backups of your component configurations. Quickly restore your setup if something goes wrong
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>👥</span>
                            Team Collaboration
                          </h4>
                          <p className="text-n-2 text-sm">
                            Share component configurations with team members. Ensure everyone works with the same field structures and settings
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🎨</span>
                            Template Reuse
                          </h4>
                          <p className="text-n-2 text-sm">
                            Create reusable component templates for common patterns like hero sections, testimonials, or contact forms
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🔄</span>
                            Migration
                          </h4>
                          <p className="text-n-2 text-sm">
                            Migrate from one WordPress installation to another while preserving all your custom components and fields
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🛠️</span>
                            Client Projects
                          </h4>
                          <p className="text-n-2 text-sm">
                            Use the same proven component structures across multiple client websites to speed up development
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* File Format */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Export File Format</h3>
                      <p className="text-n-2 mb-4">
                        All exports are saved as JSON files with a clear naming convention for easy identification:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <code className="text-color-1 text-sm">components-export-2025-10-25.json</code>
                          <p className="text-n-2 text-sm mt-2">Full component set export</p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <code className="text-color-1 text-sm">component-hero-section-2025-10-25.json</code>
                          <p className="text-n-2 text-sm mt-2">Individual component export</p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <code className="text-color-1 text-sm">fields-export-2025-10-25.json</code>
                          <p className="text-n-2 text-sm mt-2">Field-only export</p>
                        </div>
                      </div>

                      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-n-2 text-sm">
                          <span className="text-blue-400 font-semibold">📝 Note:</span> JSON files are human-readable and can be version controlled using Git, making it easy to track changes to your component configurations over time
                        </p>
                      </div>
                    </div>

                    {/* Best Practices */}
                    <div className="bg-gradient-to-r from-color-1/10 to-purple-500/10 border border-color-1/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">💡 Tips & Best Practices</h3>
                      <ul className="text-n-2 space-y-2 text-sm">
                        <li>✓ Always test imports on a staging environment before applying to production</li>
                        <li>✓ Create regular backups before making major configuration changes</li>
                        <li>✓ Use descriptive names for your components to make exports easily identifiable</li>
                        <li>✓ Keep a library of commonly used components for quick deployment</li>
                        <li>✓ Review the preview before confirming imports to avoid unintended changes</li>
                        <li>✓ Store export files in version control alongside your theme for complete project portability</li>
                        <li>✓ Document any custom configurations in your component descriptions for team clarity</li>
                        <li>✓ When importing fields to existing components, check for naming conflicts</li>
                        <li>✓ Export after completing major configuration work to create restore points</li>
                      </ul>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-2">Important Considerations</h4>
                          <ul className="text-n-2 space-y-2 text-sm">
                            <li>• Importing will not overwrite existing components with the same handle unless explicitly confirmed</li>
                            <li>• Field IDs are preserved during export/import to maintain data integrity</li>
                            <li>• Conditional logic relationships are maintained as long as target fields exist</li>
                            <li>• Media files (images, videos) are not included in exports - only their references</li>
                            <li>• Post type assignments may need to be reconfigured after import on new sites</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Field Structure Visualization Section */}
                <section id="field-visualization" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🌳</span>
                    Field Structure Visualization
                    <span className="ml-3 text-sm bg-gradient-to-r from-color-1 to-purple-500 text-white px-3 py-1 rounded-full">PRO</span>
                  </h2>
                  <p className="text-n-2 mb-6">
                    A powerful visual tool that displays your field hierarchy in an intuitive tree structure, 
                    making it easy to navigate, understand, and edit complex nested field configurations without getting lost in multiple levels.
                  </p>

                  <div className="space-y-6">
                    {/* Problem & Solution */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                          <span>⚠️</span>
                          The Problem
                        </h3>
                        <ul className="text-n-2 space-y-2 text-sm">
                          <li>• Difficult to locate specific fields in deeply nested repeater structures</li>
                          <li>• Time-consuming navigation through multiple levels</li>
                          <li>• Hard to understand field relationships at a glance</li>
                          <li>• Editing child fields requires diving deep into parent fields</li>
                          <li>• Complex projects become overwhelming to manage</li>
                        </ul>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <span>✅</span>
                          The Solution
                        </h3>
                        <ul className="text-n-2 space-y-2 text-sm">
                          <li>• Visual tree showing complete field hierarchy</li>
                          <li>• Direct edit access from any level</li>
                          <li>• Instant overview of all nested relationships</li>
                          <li>• Hover-and-click editing for quick modifications</li>
                          <li>• Save hours on complex component management</li>
                        </ul>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">How Field Visualization Works</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Access the Visual Tree</h4>
                              <p className="text-n-2 text-sm mb-3">
                                Navigate to any component and click on the "Field Visualization" or "Field Tree" button. 
                                This opens an interactive visual representation of your entire field structure.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">View Field Hierarchy</h4>
                              <p className="text-n-2 text-sm mb-3">
                                The visualization displays all fields in a hierarchical tree structure:
                              </p>
                              <div className="bg-n-7 rounded p-4 font-mono text-xs text-n-3 space-y-1">
                                <div>📋 Component: Hero Section</div>
                                <div className="ml-4">├─ 📝 Title (Text)</div>
                                <div className="ml-4">├─ 📝 Description (Textarea)</div>
                                <div className="ml-4">└─ 🔄 Features (Repeater)</div>
                                <div className="ml-8">├─ 📝 Feature Title (Text)</div>
                                <div className="ml-8">├─ 🖼️ Feature Icon (Image)</div>
                                <div className="ml-8">└─ 🔄 Nested Items (Repeater)</div>
                                <div className="ml-12">├─ 📝 Item Name (Text)</div>
                                <div className="ml-12">└─ 🔢 Item Value (Number)</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Hover to Reveal Actions</h4>
                              <p className="text-n-2 text-sm mb-3">
                                When you hover over any field card in the visualization, action icons appear:
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-n-7 rounded p-3">
                                  <span className="text-color-1 font-semibold">✏️ Edit Icon:</span>
                                  <p className="text-n-2 text-xs mt-1">Click to open the field editor</p>
                                </div>
                                <div className="bg-n-7 rounded p-3">
                                  <span className="text-color-1 font-semibold">➕ Add Icon:</span>
                                  <p className="text-n-2 text-xs mt-1">Add new child fields to repeaters</p>
                                </div>
                                <div className="bg-n-7 rounded p-3">
                                  <span className="text-color-1 font-semibold">👁️ View Icon:</span>
                                  <p className="text-n-2 text-xs mt-1">Expand/collapse nested fields</p>
                                </div>
                                <div className="bg-n-7 rounded p-3">
                                  <span className="text-color-1 font-semibold">🗑️ Delete Icon:</span>
                                  <p className="text-n-2 text-xs mt-1">Remove the field (with confirmation)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Direct Edit Access</h4>
                              <p className="text-n-2 text-sm mb-3">
                                Click the edit icon on any field to instantly open the field editor modal. 
                                Make your changes and save - no need to navigate through multiple screens.
                              </p>
                              <div className="bg-color-1/10 border border-color-1/30 rounded p-3">
                                <p className="text-n-2 text-sm">
                                  <span className="text-color-1 font-semibold">Time Saver:</span> Edit deeply nested fields in seconds instead of minutes!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Key Features</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🗺️</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Complete Field Map</h4>
                              <p className="text-n-2 text-sm">
                                See all fields at once, regardless of nesting depth. Understand the entire component structure instantly.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⚡</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Lightning-Fast Editing</h4>
                              <p className="text-n-2 text-sm">
                                No more clicking through multiple levels. Edit any field with a single click from the visualization.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🎨</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Visual Clarity</h4>
                              <p className="text-n-2 text-sm">
                                Color-coded field types and clear visual hierarchy make it easy to identify field relationships.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🔄</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Nested Repeater Support</h4>
                              <p className="text-n-2 text-sm">
                                Handle multiple levels of nested repeaters with ease. Perfect for complex data structures.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🔍</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Search & Filter</h4>
                              <p className="text-n-2 text-sm">
                                Quickly find specific fields in large component structures using built-in search functionality.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📱</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Responsive Design</h4>
                              <p className="text-n-2 text-sm">
                                Works seamlessly on all screen sizes, from desktop monitors to tablets.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">When to Use Field Visualization</h3>
                      
                      <div className="space-y-3">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 text-xl">→</span>
                            <div>
                              <h4 className="text-n-1 font-semibold mb-1">Complex Components with Multiple Repeaters</h4>
                              <p className="text-n-2 text-sm">
                                When building advanced components like pricing tables, team sections, or product catalogs with nested data.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 text-xl">→</span>
                            <div>
                              <h4 className="text-n-1 font-semibold mb-1">Debugging Field Structures</h4>
                              <p className="text-n-2 text-sm">
                                Quickly identify missing fields, incorrect nesting, or structural issues in your components.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 text-xl">→</span>
                            <div>
                              <h4 className="text-n-1 font-semibold mb-1">Team Collaboration</h4>
                              <p className="text-n-2 text-sm">
                                Help team members understand component structure without extensive documentation or training.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 text-xl">→</span>
                            <div>
                              <h4 className="text-n-1 font-semibold mb-1">Maintaining Large Projects</h4>
                              <p className="text-n-2 text-sm">
                                Essential for projects with dozens of fields where manual navigation becomes impractical.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-color-1 text-xl">→</span>
                            <div>
                              <h4 className="text-n-1 font-semibold mb-1">Quick Modifications</h4>
                              <p className="text-n-2 text-sm">
                                When you need to make rapid changes across different field levels without losing context.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Practical Example */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Practical Example: Editing a Nested Field</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-semibold mb-2">❌ Without Field Visualization:</h4>
                          <ol className="text-n-2 text-sm space-y-2 ml-4">
                            <li>1. Open the component</li>
                            <li>2. Find and click on the parent repeater field</li>
                            <li>3. Navigate into the repeater's field list</li>
                            <li>4. Find the nested repeater</li>
                            <li>5. Click to open its field list</li>
                            <li>6. Search for the specific field you need</li>
                            <li>7. Click edit on that field</li>
                            <li>8. Make changes and save</li>
                          </ol>
                          <p className="text-red-400 text-sm mt-3 font-semibold">Total Time: 2-5 minutes ⏱️</p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-semibold mb-2">✅ With Field Visualization:</h4>
                          <ol className="text-n-2 text-sm space-y-2 ml-4">
                            <li>1. Open the Field Visualization view</li>
                            <li>2. Locate the field in the visual tree</li>
                            <li>3. Hover and click the edit icon</li>
                            <li>4. Make changes and save</li>
                          </ol>
                          <p className="text-green-400 text-sm mt-3 font-semibold">Total Time: 10-20 seconds ⚡</p>
                        </div>

                        <div className="bg-color-1/10 border border-color-1/30 rounded-lg p-4">
                          <p className="text-n-2 text-sm">
                            <span className="text-color-1 font-semibold text-lg">90% Time Saved!</span> 
                            <span className="ml-2">This efficiency gain compounds when managing multiple complex components.</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Indicators */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Understanding Visual Indicators</h3>
                      <p className="text-n-2 mb-4 text-sm">
                        The visualization uses colors and icons to help you quickly identify field types and states:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">📝</span>
                          <div>
                            <span className="text-color-1 font-semibold text-sm">Text Fields</span>
                            <p className="text-n-3 text-xs">Blue accent</p>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">🔄</span>
                          <div>
                            <span className="text-purple-400 font-semibold text-sm">Repeater Fields</span>
                            <p className="text-n-3 text-xs">Purple accent with expand icon</p>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">🖼️</span>
                          <div>
                            <span className="text-green-400 font-semibold text-sm">Media Fields</span>
                            <p className="text-n-3 text-xs">Green accent</p>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">☑️</span>
                          <div>
                            <span className="text-yellow-400 font-semibold text-sm">Choice Fields</span>
                            <p className="text-n-3 text-xs">Yellow accent</p>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">🎯</span>
                          <div>
                            <span className="text-orange-400 font-semibold text-sm">Conditional Fields</span>
                            <p className="text-n-3 text-xs">Orange badge indicator</p>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-3 flex items-center gap-3">
                          <span className="text-xl">⚠️</span>
                          <div>
                            <span className="text-red-400 font-semibold text-sm">Required Fields</span>
                            <p className="text-n-3 text-xs">Red asterisk marker</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tips & Best Practices */}
                    <div className="bg-gradient-to-r from-color-1/10 to-purple-500/10 border border-color-1/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">💡 Tips & Best Practices</h3>
                      <ul className="text-n-2 space-y-2 text-sm">
                        <li>✓ Use Field Visualization as your primary tool when working with 3+ levels of nesting</li>
                        <li>✓ Keep the visualization open in a second browser tab for quick reference while coding</li>
                        <li>✓ Take screenshots of complex structures for documentation purposes</li>
                        <li>✓ Use descriptive field names - they're more helpful in the visual tree view</li>
                        <li>✓ Regularly review the visualization to identify opportunities to simplify your structure</li>
                        <li>✓ Collapse branches you're not working on to reduce visual clutter</li>
                        <li>✓ Use the search feature to quickly locate fields by name or type</li>
                        <li>✓ Share visualization screenshots with team members to explain component architecture</li>
                      </ul>
                    </div>

                    {/* PRO Feature Notice */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-color-1/20 border border-purple-500/50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">🚀</span>
                        <div>
                          <h3 className="text-xl font-semibold text-n-1 mb-2 flex items-center gap-2">
                            PRO Feature
                            <span className="text-xs bg-gradient-to-r from-color-1 to-purple-500 text-white px-2 py-1 rounded-full">PREMIUM</span>
                          </h3>
                          <p className="text-n-2 text-sm mb-3">
                            Field Structure Visualization is available exclusively in the PRO version of Custom Craft Component. 
                            This powerful feature is designed for professionals managing complex WordPress projects.
                          </p>
                          <div className="flex gap-4 text-sm">
                            <div className="text-color-1">
                              <span className="font-semibold">Included in:</span> PRO License
                            </div>
                            <div className="text-purple-400">
                              <span className="font-semibold">Perfect for:</span> Agencies & Enterprise Users
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* AI Component Generation Section */}
                <section id="ai-generation" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-n-1 mb-4 flex items-center">
                    <span className="mr-3">🤖</span>
                    AI Component Generation
                    <span className="ml-3 text-sm bg-gradient-to-r from-color-1 to-purple-500 text-white px-3 py-1 rounded-full">PRO</span>
                  </h2>
                  <p className="text-n-2 mb-6">
                    Revolutionary AI-powered feature that creates complete components with fields automatically based on your description. 
                    Transform your ideas into fully functional components in seconds, saving hours of manual setup time.
                  </p>

                  <div className="space-y-6">
                    {/* The Revolution */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-color-1/10 border border-purple-500/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4 flex items-center gap-2">
                        <span>✨</span>
                        From Idea to Component in Seconds
                      </h3>
                      <p className="text-n-2 mb-4">
                        Instead of spending time manually creating components, thinking about field names, types, and structure - 
                        simply describe what you need and let AI do the heavy lifting. The system generates:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-n-8/50 rounded p-3 flex items-start gap-2">
                          <span className="text-color-1">✓</span>
                          <span className="text-n-2 text-sm">Component with proper naming</span>
                        </div>
                        <div className="bg-n-8/50 rounded p-3 flex items-start gap-2">
                          <span className="text-color-1">✓</span>
                          <span className="text-n-2 text-sm">All necessary fields with appropriate types</span>
                        </div>
                        <div className="bg-n-8/50 rounded p-3 flex items-start gap-2">
                          <span className="text-color-1">✓</span>
                          <span className="text-n-2 text-sm">Field labels and descriptions</span>
                        </div>
                        <div className="bg-n-8/50 rounded p-3 flex items-start gap-2">
                          <span className="text-color-1">✓</span>
                          <span className="text-n-2 text-sm">Automatic template file generation</span>
                        </div>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">How AI Component Generation Works</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Describe Your Component</h4>
                              <p className="text-n-2 text-sm mb-3">
                                Navigate to the AI Component Generator and describe what you want to create. 
                                Be specific about the fields and functionality you need.
                              </p>
                              <div className="bg-n-7 border border-n-6 rounded p-4 mt-3">
                                <p className="text-n-3 text-xs font-semibold mb-2">Example Prompt:</p>
                                <p className="text-n-2 text-sm italic">
                                  "I want to create a testimonials component with customer name, testimonial content, 
                                  customer photo, company name, and rating. The component should be visually appealing and professional."
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Choose Your Generation Method</h4>
                              <p className="text-n-2 text-sm mb-3">Three powerful options to fit your workflow:</p>
                              
                              <div className="space-y-3">
                                <div className="bg-n-7 rounded p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">⚡</span>
                                    <h5 className="text-color-1 font-semibold">Auto Generate</h5>
                                  </div>
                                  <p className="text-n-2 text-sm">
                                    Fully automatic AI component creation. Click and wait - the system handles everything 
                                    from component creation to field setup. Perfect for quick development.
                                  </p>
                                </div>

                                <div className="bg-n-7 rounded p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">🔗</span>
                                    <h5 className="text-purple-400 font-semibold">Generate with ChatGPT</h5>
                                  </div>
                                  <p className="text-n-2 text-sm">
                                    Opens ChatGPT with a pre-filled prompt based on your description. 
                                    You can refine the request, have a conversation, and import the result back. 
                                    Great for complex or custom requirements.
                                  </p>
                                </div>

                                <div className="bg-n-7 rounded p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">📝</span>
                                    <h5 className="text-blue-400 font-semibold">Open ChatGPT Manually</h5>
                                  </div>
                                  <p className="text-n-2 text-sm">
                                    Opens ChatGPT with a blank page for maximum flexibility. 
                                    Useful when you want to start fresh or have special instructions.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Component Created Instantly</h4>
                              <p className="text-n-2 text-sm mb-3">
                                The AI analyzes your requirements and creates:
                              </p>
                              <ul className="text-n-2 text-sm space-y-2">
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>A properly named component with a clean handle</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>All necessary fields with correct field types (text, image, repeater, etc.)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Descriptive labels and helpful placeholder text</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Automatic template file in your theme directory</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Ready-to-use code structure for immediate implementation</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <span className="bg-color-1 text-n-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                            <div className="flex-1">
                              <h4 className="text-color-1 font-semibold mb-2">Design & Deploy</h4>
                              <p className="text-n-2 text-sm mb-3">
                                Your job is now focused on creativity instead of setup:
                              </p>
                              <ul className="text-n-2 text-sm space-y-2">
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Design the template file with your desired styling</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Assign the component to pages or post types</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Add content through the user-friendly interface</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-color-1 mt-1">→</span>
                                  <span>Reuse the component across multiple pages and post types</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Multiple Instances Feature */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Multiple Instances Support</h3>
                      <p className="text-n-2 mb-4">
                        When creating your component, you can enable the "Multiple Instances" option. This allows:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🔄</span>
                            Reusable Components
                          </h4>
                          <p className="text-n-2 text-sm">
                            Use the same component multiple times on a single page with different content for each instance
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>📄</span>
                            Flexible Layouts
                          </h4>
                          <p className="text-n-2 text-sm">
                            Create dynamic page layouts by combining multiple instances of different components
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Revolutionary Benefits</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⏱️</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Massive Time Savings</h4>
                              <p className="text-n-2 text-sm">
                                What used to take 30-60 minutes of manual field creation now takes 10-20 seconds. 
                                Focus on design and functionality, not repetitive setup tasks.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🎯</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Smart Field Selection</h4>
                              <p className="text-n-2 text-sm">
                                AI automatically chooses the most appropriate field types based on your description. 
                                No need to decide between text, textarea, or WYSIWYG - AI knows best.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">♻️</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Maximum Reusability</h4>
                              <p className="text-n-2 text-sm">
                                Components can be used across pages and post types. No need to create separate templates 
                                for different sections - one component serves all.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🚀</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Better Performance</h4>
                              <p className="text-n-2 text-sm">
                                Reduced website size and improved page load speeds. Efficient component structure 
                                means cleaner code and faster execution.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📐</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Consistent Naming</h4>
                              <p className="text-n-2 text-sm">
                                AI generates professional, consistent naming conventions for components and fields. 
                                No more worrying about proper naming patterns.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🎨</span>
                            <div>
                              <h4 className="text-color-1 font-semibold mb-2">Flexible Development</h4>
                              <p className="text-n-2 text-sm">
                                Smart development approach that adapts to your needs. Template auto-generation 
                                means you can start designing immediately.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Practical Examples */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Real-World Example Prompts</h3>
                      <p className="text-n-2 mb-4 text-sm">
                        Here are some example prompts and what they generate:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="mb-3">
                            <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">Example 1</span>
                          </div>
                          <p className="text-n-2 text-sm italic mb-3">
                            "Create a team member showcase with name, position, bio, profile photo, social media links, and skills list"
                          </p>
                          <div className="bg-n-7 rounded p-3">
                            <p className="text-n-3 text-xs mb-2">AI Generates:</p>
                            <ul className="text-n-2 text-xs space-y-1">
                              <li>• Component: "Team Member Showcase"</li>
                              <li>• Fields: Name (Text), Position (Text), Bio (Textarea), Photo (Image), Social Links (Repeater), Skills (Checkbox)</li>
                              <li>• Template: team-member-showcase.php</li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="mb-3">
                            <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">Example 2</span>
                          </div>
                          <p className="text-n-2 text-sm italic mb-3">
                            "Build a pricing table with plan name, price, billing period, features list, highlight toggle, and CTA button"
                          </p>
                          <div className="bg-n-7 rounded p-3">
                            <p className="text-n-3 text-xs mb-2">AI Generates:</p>
                            <ul className="text-n-2 text-xs space-y-1">
                              <li>• Component: "Pricing Table"</li>
                              <li>• Fields: Plan Name (Text), Price (Number), Period (Select), Features (Repeater), Highlight (Toggle), CTA Button (Link)</li>
                              <li>• Template: pricing-table.php</li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <div className="mb-3">
                            <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">Example 3</span>
                          </div>
                          <p className="text-n-2 text-sm italic mb-3">
                            "Design a portfolio project component with project title, description, images gallery, client name, project date, and tags"
                          </p>
                          <div className="bg-n-7 rounded p-3">
                            <p className="text-n-3 text-xs mb-2">AI Generates:</p>
                            <ul className="text-n-2 text-xs space-y-1">
                              <li>• Component: "Portfolio Project"</li>
                              <li>• Fields: Title (Text), Description (WYSIWYG), Images (Gallery), Client (Text), Date (Date), Tags (Checkbox)</li>
                              <li>• Template: portfolio-project.php</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Template Auto-Generation */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">Automatic Template Creation</h3>
                      <p className="text-n-2 mb-4">
                        One of the most powerful aspects of AI component generation is automatic template file creation:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>📁</span>
                            Template File Location
                          </h4>
                          <p className="text-n-2 text-sm mb-2">
                            Templates are automatically created in your theme's directory:
                          </p>
                          <div className="bg-n-7 rounded p-3 font-mono text-xs text-n-3">
                            /wp-content/themes/your-theme/ccc-templates/component-name.php
                          </div>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>💻</span>
                            Pre-filled Code Structure
                          </h4>
                          <p className="text-n-2 text-sm mb-2">
                            Template includes all necessary PHP code to retrieve and display fields, 
                            complete with proper escaping and best practices. You only need to add HTML/CSS styling.
                          </p>
                        </div>

                        <div className="bg-n-8 border border-n-6 rounded-lg p-4">
                          <h4 className="text-color-1 font-semibold mb-2 flex items-center gap-2">
                            <span>🔁</span>
                            Single Template, Multiple Uses
                          </h4>
                          <p className="text-n-2 text-sm">
                            No need to create separate templates for pages vs. posts. One template handles all post types 
                            and page assignments, controlled entirely through the plugin interface.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time Comparison */}
                    <div className="bg-n-7/50 border border-n-6 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">The Time-Saving Revolution</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
                          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                            <span>⏰</span>
                            Traditional Manual Method
                          </h4>
                          <ol className="text-n-2 text-sm space-y-2">
                            <li>1. Think of component name and handle</li>
                            <li>2. Create component manually</li>
                            <li>3. Decide on field names and types</li>
                            <li>4. Add each field one by one</li>
                            <li>5. Configure field settings individually</li>
                            <li>6. Create template file manually</li>
                            <li>7. Write all template code</li>
                            <li>8. Test and debug</li>
                          </ol>
                          <div className="mt-4 pt-4 border-t border-red-500/30">
                            <p className="text-red-400 font-semibold">Total Time: 30-60 minutes</p>
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5">
                          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                            <span>⚡</span>
                            AI-Powered Method
                          </h4>
                          <ol className="text-n-2 text-sm space-y-2">
                            <li>1. Describe what you want</li>
                            <li>2. Click "Auto Generate"</li>
                            <li>3. Wait 10-20 seconds</li>
                            <li>4. Component created with all fields</li>
                            <li>5. Template auto-generated</li>
                            <li>6. Code structure ready</li>
                            <li>7. Add your styling</li>
                            <li>8. Deploy immediately</li>
                          </ol>
                          <div className="mt-4 pt-4 border-t border-green-500/30">
                            <p className="text-green-400 font-semibold">Total Time: 10-20 seconds + styling</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-gradient-to-r from-color-1/20 to-purple-500/20 border border-color-1/30 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-color-1 mb-2">95% Time Reduction!</p>
                        <p className="text-n-2 text-sm">
                          Spend your time on what matters - designing beautiful interfaces and creating amazing user experiences
                        </p>
                      </div>
                    </div>

                    {/* Best Practices */}
                    <div className="bg-gradient-to-r from-color-1/10 to-purple-500/10 border border-color-1/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-n-1 mb-4">💡 Tips for Best Results</h3>
                      <ul className="text-n-2 space-y-2 text-sm">
                        <li>✓ Be specific in your descriptions - mention field types if you have preferences</li>
                        <li>✓ Include details about layout and visual requirements for better field selection</li>
                        <li>✓ Mention if you need repeater fields for multiple items (testimonials, team members, etc.)</li>
                        <li>✓ Specify any validation requirements (required fields, formats, limits)</li>
                        <li>✓ Review the generated component and adjust fields if needed - AI is smart but you're in control</li>
                        <li>✓ Use "Generate with ChatGPT" option for complex components that need refinement</li>
                        <li>✓ Enable "Multiple Instances" if you plan to use the component in various places</li>
                        <li>✓ After generation, focus your time on designing the template with your brand styling</li>
                        <li>✓ Test the component on a staging site before deploying to production</li>
                      </ul>
                    </div>

                    {/* PRO Feature Notice */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-color-1/20 border border-purple-500/50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">🤖</span>
                        <div>
                          <h3 className="text-xl font-semibold text-n-1 mb-2 flex items-center gap-2">
                            PRO Feature - Game Changer for Developers
                            <span className="text-xs bg-gradient-to-r from-color-1 to-purple-500 text-white px-2 py-1 rounded-full">PREMIUM</span>
                          </h3>
                          <p className="text-n-2 text-sm mb-3">
                            AI Component Generation is exclusively available in the PRO version. This revolutionary feature 
                            transforms how you build WordPress sites, making development faster, smarter, and more efficient.
                          </p>
                          <div className="grid md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-n-8/50 rounded p-3">
                              <span className="text-color-1 font-semibold">Perfect for:</span>
                              <p className="text-n-2 text-xs mt-1">Agencies & Freelancers</p>
                            </div>
                            <div className="bg-n-8/50 rounded p-3">
                              <span className="text-purple-400 font-semibold">Saves:</span>
                              <p className="text-n-2 text-xs mt-1">Hundreds of hours annually</p>
                            </div>
                            <div className="bg-n-8/50 rounded p-3">
                              <span className="text-blue-400 font-semibold">ROI:</span>
                              <p className="text-n-2 text-xs mt-1">Pays for itself in days</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Complete Example Section */}
                <section id="complete-example" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">�</span>
                Complete Template Example
              </h2>

              <div className="space-y-6">
                <p className="text-n-2 mb-4">Here's the complete hero section template showing all fields in action:</p>
                <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3 overflow-x-auto">
                  <pre>{`<?php
/**
 * Component: Hero Section
 * Handle: hero_section
 */

// Text
$title = get_ccc_field('title');
// Text Area
$text_area = get_ccc_field('text_area');
// Email
$email = get_ccc_field('email');
// Number
$number = get_ccc_field('number');
// Link
$link = get_ccc_field('link');
$link_target = get_ccc_field_target('link');
// Select
$select = get_ccc_field('select');
$multi_select_list = get_ccc_select_values('select', null, null, 'list');
$multi_select_string = get_ccc_select_values('select', null, null, 'string');
// Checkbox  
$checkbox = get_ccc_field('checkbox');
$checkbox_string = get_ccc_select_values('checkbox', null, null, 'string');
$checkbox_list = get_ccc_select_values('checkbox', null, null, 'list');
// Radio
$radio = get_ccc_field('radio');
// Toggle
$toggle = get_ccc_field('toggle');
// Color
$color = get_ccc_field('color');
$main_color = get_ccc_field_color('color');
$hover_color = get_ccc_field_hover_color('color');
$adjusted_color = get_ccc_field_adjusted_color('color');
// Range
$range = get_ccc_field('range');
// Date
$date_value = get_ccc_field('date');
// File
$file = get_ccc_field('file');
// WYSIWYG Editor
$wysiwyg = get_ccc_field('wysiwyg_editor');
// Oembed
$oembded = get_ccc_field('oembded');
// Relationship
$related_posts = get_ccc_field('realtionship');
// Image
$image = get_ccc_field('image');
// Video
$video = get_ccc_field('video');
// Repeater
$repeater = get_ccc_field('repeater');
// Gallery
$gallery = get_ccc_field('gallery');
?>

<?php if ($toggle) { ?>
    <section class="p-6">
        <h1><?php echo esc_html($title); ?></h1>
        <p><?php echo esc_html($text_area); ?></p>
        <!-- All your content using the fields above -->
    </section>
<?php } ?>`}</pre>
                </div>
              </div>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">✅</span>
                Best Practices
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Security</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Always use esc_html() for text output</li>
                    <li>• Use esc_url() for URLs and links</li>
                    <li>• Use esc_attr() for HTML attributes</li>
                    <li>• Validate all field values before use</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Performance</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Optimize images before uploading</li>
                    <li>• Use appropriate video formats</li>
                    <li>• Consider lazy loading for galleries</li>
                    <li>• Cache field values when possible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Accessibility</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Add alt text to all images</li>
                    <li>• Use semantic HTML elements</li>
                    <li>• Ensure good color contrast</li>
                    <li>• Use proper heading hierarchy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Code Quality</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Check if fields have values before use</li>
                    <li>• Use consistent naming conventions</li>
                    <li>• Comment your code when necessary</li>
                    <li>• Test all field combinations</li>
                  </ul>
                </div>
              </div>
            </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
