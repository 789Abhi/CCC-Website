import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const DocumentationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <div className="relative z-10 px-4 py-[100px]">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-n-1 mb-6">Custom Craft Component Documentation</h1>
            <p className="text-xl text-n-2 max-w-4xl mx-auto mb-8">
              Complete guide to using Custom Craft Component for creating dynamic WordPress components with all available field types.
            </p>
            <div className="bg-color-1/10 border border-color-1/20 rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-color-1 font-semibold mb-2">📚 Complete Field Reference</p>
              <p className="text-n-2 text-sm">Comprehensive documentation covering all 25 field types with detailed code examples, usage instructions, and best practices.</p>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-12">
            {/* Text Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">📝</span>
                Text Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Text Field</h3>
                  <p className="text-n-2 mb-4">Single-line text input for titles, names, and short content.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$title = get_ccc_field('title');
// In your template:
<h1 class="hero-title"><?php echo esc_html($title); ?></h1>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Always use esc_html() for security when outputting text content.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Text Area Field</h3>
                  <p className="text-n-2 mb-4">Multi-line text input for longer content like descriptions or article excerpts.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$content = get_ccc_field('content');
// In your template:
<div class="content-area">
    <?php echo wpautop(esc_html($content)); ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Use wpautop() to automatically convert line breaks to paragraph tags.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Email Field</h3>
                  <p className="text-n-2 mb-4">Email input field with built-in validation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$email = get_ccc_field('email');
// In your template:
<a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Email fields are automatically validated and sanitized.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Password Field</h3>
                  <p className="text-n-2 mb-4">Password input field for sensitive data (typically used in forms, not for display).</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$password = get_ccc_field('password');
// Note: Password fields are typically used for form processing
// In your PHP processing (not for display):
if (!empty($password)) {
    // Hash and store password securely
    $hashed_password = wp_hash_password($password);
}
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Never output password values directly. Use for form processing only.</p>
                </div>
              </div>
            </section>

            {/* Media Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🖼️</span>
                Media Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Image Field</h3>
                  <p className="text-n-2 mb-4">Upload and display images with automatic WordPress optimization and responsive sizing.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$hero_image = get_ccc_field('hero_image');
// In your template:
<img src="<?php echo esc_url($hero_image); ?>"
     alt="Hero Image"
     class="w-full h-[400px] object-cover rounded-lg">
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Images are automatically optimized and responsive. Use esc_url() for security.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Video Field</h3>
                  <p className="text-n-2 mb-4">Upload videos or embed from external sources (YouTube, Vimeo, etc.) with HTML5 player support.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
// Basic video field retrieval
$video = get_ccc_field('video');

// Advanced video rendering with options
<div>
    <?php echo get_ccc_field_video('video', [
        'width' => '100%',
        'height' => '400',
        'controls' => true,
        'autoplay' => false,
        'muted' => false,
        'loop' => false
    ]); ?>
</div>

// External video URL
$external_video = get_ccc_field('external_video');
if ($external_video) {
    echo get_ccc_field_video('external_video', [
        'width' => '560',
        'height' => '315'
    ]);
}
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports MP4 files, YouTube, Vimeo, Dailymotion, Facebook, Twitch, and TikTok videos.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Gallery Field</h3>
                  <p className="text-n-2 mb-4">Display multiple images in a grid or carousel layout with alt text support.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$gallery_images = get_ccc_field('image_gallery');
// In your template:
<div class="gallery grid grid-cols-3 gap-4">
    <?php if ($gallery_images && is_array($gallery_images)): ?>
        <?php foreach ($gallery_images as $image): ?>
            <img src="<?php echo esc_url($image['url']); ?>"
                 alt="<?php echo esc_attr($image['alt'] ?: 'Gallery Image'); ?>"
                 class="w-full h-48 object-cover rounded">
        <?php endforeach; ?>
    <?php endif; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Gallery supports multiple images with metadata and responsive layouts.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">File Field</h3>
                  <p className="text-n-2 mb-4">Upload and manage various file types (PDF, DOC, ZIP, etc.).</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$file = get_ccc_field('document');
// In your template:
<?php if ($file): ?>
    <a href="<?php echo esc_url($file); ?>"
       class="btn btn-download"
       download>
        Download <?php echo esc_html($file['filename'] ?? 'File'); ?>
    </a>
<?php endif; ?>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports multiple file types with download links and file information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">oEmbed Field</h3>
                  <p className="text-n-2 mb-4">Embed content from external sources (YouTube, Twitter, etc.) using WordPress oEmbed.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$embed_content = get_ccc_field('embed_content');
// In your template:
<div class="embed-container">
    <?php echo $embed_content; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Automatically handles embedding from supported external services.</p>
                </div>
              </div>
            </section>

            {/* Selection Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">☑️</span>
                Selection Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Select Field</h3>
                  <p className="text-n-2 mb-4">Dropdown selection for single or multiple choices from predefined options.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$layout_style = get_ccc_field('layout_style');
// Single select
$options = get_ccc_select_values('layout_style', null, null, 'list');
// In your template:
<select class="form-select">
    <?php foreach ($options as $option): ?>
        <option value="<?php echo esc_attr($option['value']); ?>"
                <?php selected($layout_style, $option['value']); ?>>
            <?php echo esc_html($option['label']); ?>
        </option>
    <?php endforeach; ?>
</select>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports both single and multiple selection modes.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Checkbox Field</h3>
                  <p className="text-n-2 mb-4">Multiple selection checkboxes that return an array of selected values.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$selected_features = get_ccc_field('features');
// In your template:
<ul class="features-list">
    <?php foreach ($selected_features as $feature): ?>
        <li class="feature-item"><?php echo esc_html($feature); ?></li>
    <?php endforeach; ?>
</ul>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Returns an array of selected values for flexible content filtering.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Radio Field</h3>
                  <p className="text-n-2 mb-4">Single selection radio buttons for mutually exclusive options.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$priority_level = get_ccc_field('priority_level');
// In your template:
<div class="priority-<?php echo esc_attr($priority_level); ?>">
    Priority: <?php echo esc_html($priority_level); ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Perfect for single-choice selections where only one option can be selected.</p>
                </div>
              </div>
            </section>

            {/* Advanced Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🎨</span>
                Advanced Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Color Field</h3>
                  <p className="text-n-2 mb-4">Color picker for selecting colors that can generate CSS variables.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$primary_color = get_ccc_field('primary_color');
$color_css = get_ccc_field_color('primary_color');
// In your template:
<div style="background-color: <?php echo esc_attr($color_css); ?>;">
    <p>This box uses your selected color!</p>
</div>

// For CSS variables:
<?php echo get_ccc_color_css_variables_root('primary_color'); ?>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Colors are returned as hex values and can generate CSS variables.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">User Field</h3>
                  <p className="text-n-2 mb-4">Select WordPress users and display their information including avatars.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$selected_users = get_ccc_field_user('team_members', null, null, null, 'display');
// In your template:
<div class="team-section">
    <?php foreach ($selected_users as $user): ?>
        <div class="team-member">
            <img src="<?php echo esc_url($user['avatar']); ?>"
                 alt="<?php echo esc_attr($user['name']); ?>"
                 class="w-16 h-16 rounded-full">
            <h4><?php echo esc_html($user['name']); ?></h4>
            <p><?php echo esc_html($user['email']); ?></p>
        </div>
    <?php endforeach; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">User fields provide rich user data including avatars and contact information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">WYSIWYG Field</h3>
                  <p className="text-n-2 mb-4">Rich text editor with formatting options similar to WordPress post editor.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$content = get_ccc_field('rich_content');
// In your template:
<div class="rich-content">
    <?php echo wp_kses_post($content); ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports rich text formatting including bold, italic, links, and media embeds.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Toggle Field</h3>
                  <p className="text-n-2 mb-4">Boolean toggle switch for yes/no or true/false values.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$show_title = get_ccc_field('show_title');
// In your template:
<?php if ($show_title): ?>
    <h1>Title Section</h1>
<?php endif; ?>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Returns true/false values perfect for conditional display logic.</p>
                </div>
              </div>
            </section>

            {/* Number and Input Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🔢</span>
                Number & Input Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Number Field</h3>
                  <p className="text-n-2 mb-4">Numeric input field with validation for integers or decimals.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$quantity = get_ccc_field('quantity');
$price = get_ccc_field('price');
// In your template:
<span>Quantity: <?php echo intval($quantity); ?></span>
<span>Price: $<?php echo number_format(floatval($price), 2); ?></span>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports integer and decimal numbers with validation.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Range Field</h3>
                  <p className="text-n-2 mb-4">Slider input for selecting values within a specified range.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$volume = get_ccc_field('volume');
$rating = get_ccc_field('rating');
// In your template:
<div class="volume-control" style="width: <?php echo intval($volume); ?>%"></div>
<div class="rating-display">Rating: <?php echo intval($rating); ?>/10</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Perfect for ratings, percentages, and other range-based inputs.</p>
                </div>
              </div>
            </section>

            {/* Relationship Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🔗</span>
                Relationship Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Relationship Field</h3>
                  <p className="text-n-2 mb-4">Select and relate to other WordPress posts, pages, or custom post types.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$related_posts = get_ccc_field('related_posts');
// In your template:
<div class="related-posts">
    <?php foreach ($related_posts as $post_id): ?>
        <?php $post = get_post($post_id); ?>
        <article class="related-post">
            <h3><a href="<?php echo get_permalink($post); ?>"><?php echo esc_html($post->post_title); ?></a></h3>
            <p><?php echo esc_html(get_the_excerpt($post)); ?></p>
        </article>
    <?php endforeach; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Returns array of post IDs for flexible content relationships.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Taxonomy Term Field</h3>
                  <p className="text-n-2 mb-4">Select taxonomy terms (categories, tags, custom taxonomies).</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$categories = get_ccc_field('categories');
// In your template:
<div class="post-categories">
    <?php foreach ($categories as $term_id): ?>
        <?php $term = get_term($term_id); ?>
        <span class="category-tag"><?php echo esc_html($term->name); ?></span>
    <?php endforeach; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports categories, tags, and custom taxonomies.</p>
                </div>
              </div>
            </section>

            {/* Complex Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🔄</span>
                Complex Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Repeater Field</h3>
                  <p className="text-n-2 mb-4">Create repeatable blocks of fields for flexible content structures.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$testimonials = get_ccc_field('testimonials');
// In your template:
<div class="testimonials">
    <?php foreach ($testimonials as $testimonial): ?>
        <blockquote class="testimonial">
            <p><?php echo esc_html($testimonial['quote']); ?></p>
            <cite><?php echo esc_html($testimonial['author']); ?></cite>
        </blockquote>
    <?php endforeach; ?>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Perfect for testimonials, team members, features lists, and other repeatable content.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Link Field</h3>
                  <p className="text-n-2 mb-4">Create clickable links with optional target attributes and custom text.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$link_target = get_ccc_field_target('cta_link');
$link_url = get_ccc_field('cta_link');
// In your template:
<a href="<?php echo esc_url($link_target['url']); ?>"
   <?php echo $link_target['target']; ?>
   class="btn btn-primary">
    <?php echo esc_html($link_url); ?>
</a>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Supports custom text, URLs, and target attributes (_blank, _self, etc.).</p>
                </div>
              </div>
            </section>

            {/* Date and Time Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">📅</span>
                Date and Time Fields
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Date Field</h3>
                  <p className="text-n-2 mb-4">Handle date values for events, deadlines, and scheduling.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$event_date = get_ccc_field('event_date');
// Returns: "2025-09-22"
// In your template:
<time datetime="<?php echo esc_attr($event_date); ?>">
    <?php echo date('F j, Y', strtotime($event_date)); ?>
</time>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Dates are returned in YYYY-MM-DD format and should be formatted for display.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">DateTime Field</h3>
                  <p className="text-n-2 mb-4">Capture both date and time information for precise scheduling.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$event_datetime = get_ccc_field('event_datetime');
// Returns: "2025-09-22 14:30:00"
// In your template:
<time datetime="<?php echo esc_attr($event_datetime); ?>">
    <?php echo date('F j, Y \a\t g:i A', strtotime($event_datetime)); ?>
</time>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">DateTime fields include both date and time in a single value.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Time Range Field</h3>
                  <p className="text-n-2 mb-4">Define time ranges with start time, end time, and automatic duration calculation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
$time_range = get_ccc_field('event_time_range');
// Returns: ['from' => '09:00:00', 'to' => '17:00:00', 'duration' => '8 hours']
// In your template:
<div class="time-info">
    <span>Start: <?php echo esc_html($time_range['from']); ?></span>
    <span>End: <?php echo esc_html($time_range['to']); ?></span>
    <span>Duration: <?php echo esc_html($time_range['duration']); ?></span>
</div>
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">Time ranges automatically calculate duration and support various time formats.</p>
                </div>
              </div>
            </section>

            {/* Styling and CSS Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🎨</span>
                Styling & CSS Variables
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">CSS Variables Setup</h3>
                  <p className="text-n-2 mb-4">Use color fields to create dynamic CSS variables for consistent theming across your site.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
// In your theme's functions.php or template:
echo get_ccc_color_css_variables_root('primary_color');
?>

// In your CSS:
:root {
    --ccc-color-main: #your-color;
    --ccc-color-hover: #darker-shade;
}

.dynamic-button {
    background-color: var(--ccc-color-main);
    color: white;
    transition: all 0.3s ease;
}

.dynamic-button:hover {
    background-color: var(--ccc-color-hover);
}
?>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">CSS variables ensure consistent styling and easy theme customization.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Complete Template Example</h3>
                  <p className="text-n-2 mb-4">Here's a complete hero section template that combines multiple field types:</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`<?php
// Hero Section Component Template
$show_title = get_ccc_field('show_title');
$hero_title = get_ccc_field('hero_title');
$hero_description = get_ccc_field('hero_description');
$hero_image = get_ccc_field('hero_image');
$background_video = get_ccc_field('background_video');
$cta_link = get_ccc_field_target('cta_link');
$cta_text = get_ccc_field('cta_text');
$primary_color = get_ccc_field_color('primary_color');
?>

<section class="hero-section">
    <?php if ($background_video): ?>
        <video autoplay muted loop>
            <source src="<?php echo esc_url($background_video); ?>" type="video/mp4">
        </video>
    <?php endif; ?>

    <div class="hero-content">
        <?php if ($show_title && $hero_title): ?>
            <h1><?php echo esc_html($hero_title); ?></h1>
        <?php endif; ?>

        <?php if ($hero_description): ?>
            <p><?php echo esc_html($hero_description); ?></p>
        <?php endif; ?>

        <?php if ($hero_image): ?>
            <img src="<?php echo esc_url($hero_image); ?>" alt="Hero Image">
        <?php endif; ?>

        <?php if ($cta_text && $cta_link): ?>
            <a href="<?php echo esc_url($cta_link['url']); ?>"
               style="background-color: <?php echo esc_attr($primary_color); ?>;">
                <?php echo esc_html($cta_text); ?>
            </a>
        <?php endif; ?>
    </div>
</section>`}</pre>
                  </div>
                  <p className="text-n-2 mt-3 text-sm">This example shows how multiple field types work together in a real template.</p>
                </div>
              </div>
            </section>

            {/* Best Practices Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">✅</span>
                Best Practices & Tips
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Security</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Always use esc_html() for text output</li>
                    <li>• Use esc_url() for URLs and image sources</li>
                    <li>• Use esc_attr() for HTML attributes</li>
                    <li>• Validate and sanitize all field values</li>
                    <li>• Never output password fields directly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Performance</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Cache frequently used field values</li>
                    <li>• Use appropriate image sizes for different contexts</li>
                    <li>• Optimize video loading with preload attributes</li>
                    <li>• Consider lazy loading for galleries</li>
                    <li>• Use CSS variables for consistent theming</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">Accessibility</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Add proper alt text to all images</li>
                    <li>• Use semantic HTML elements</li>
                    <li>• Ensure sufficient color contrast</li>
                    <li>• Add ARIA labels where appropriate</li>
                    <li>• Use proper heading hierarchy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-n-1 mb-3">SEO</h3>
                  <ul className="text-n-2 space-y-2 text-sm">
                    <li>• Use structured data when applicable</li>
                    <li>• Optimize image file names and sizes</li>
                    <li>• Include proper meta descriptions</li>
                    <li>• Use semantic markup for better crawling</li>
                    <li>• Implement proper heading structure</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link to="/" className="text-n-2 hover:text-n-1 transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
