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

      <div className="relative z-10 px-4 py-[200px]">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-n-1 mb-6">Hero Section Documentation</h1>
            <p className="text-xl text-n-2 max-w-4xl mx-auto mb-8">
              Complete guide to using all available fields in the Hero Section component with practical examples.
            </p>
            <div className="bg-color-1/10 border border-color-1/20 rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-color-1 font-semibold mb-2">📚 Hero Section Field Reference</p>
              <p className="text-n-2 text-sm">Component Handle: hero_section - All field declarations and usage examples from the actual template.</p>
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
                    <pre>{`// Text
$title = get_ccc_field('title');

// Usage:
<h1><?php echo esc_html($title); ?></h1>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Text Area Field</h3>
                  <p className="text-n-2 mb-4">Multi-line text input for longer content like descriptions.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Text Area
$text_area = get_ccc_field('text_area');

// Usage:
<p><?php echo esc_html($text_area); ?></p>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Email Field</h3>
                  <p className="text-n-2 mb-4">Email input field with built-in validation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Email
$email = get_ccc_field('email');

// Usage:
<p><?php echo esc_html($email); ?></p>`}</pre>
                  </div>
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
                  <p className="text-n-2 mb-4">Upload and display images.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Image
$image = get_ccc_field('image');

// Usage:
<img class="w-20 h-20" src="<?php echo $image ?>" alt="">`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Video Field</h3>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Gallery Field</h3>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">File Field</h3>
                  <p className="text-n-2 mb-4">Upload and manage file downloads.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// File
$file = get_ccc_field('file');

// Usage:
<div>
    <a href="<?php echo $file ?>">Download File</a>
</div>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">oEmbed Field</h3>
                  <p className="text-n-2 mb-4">Embed content from external sources (YouTube, Vimeo, etc.).</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Oembedded 
$oembded = get_ccc_field('oembded');

// Usage:
<div>
    <?php echo $oembded; ?>
</div>`}</pre>
                  </div>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Checkbox Field</h3>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Radio Field</h3>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Toggle Field</h3>
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
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">WYSIWYG Editor</h3>
                  <p className="text-n-2 mb-4">Rich text editor with formatting options.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Wiysiwyg Editor
$wysiwyg = get_ccc_field('wysiwyg_editor');

// Usage:
<div>
    <?php echo $wysiwyg; ?>
</div>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Link Field</h3>
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
                  <p className="text-n-2 mb-4">Numeric input field with validation.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Number
$number = get_ccc_field('number');

// Usage:
<p><?php echo esc_html($number); ?></p>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Range Field</h3>
                  <p className="text-n-2 mb-4">Slider input for selecting values within a range.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Range
$range = get_ccc_field('range');

// Usage:
<div>
    Range Value: <?php echo ($range); ?>
</div>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Date Field</h3>
                  <p className="text-n-2 mb-4">Handle date values for events and scheduling.</p>
                  <div className="bg-n-7 border border-n-6 rounded-lg p-4 text-sm text-n-3">
                    <pre>{`// Date
$date_value = get_ccc_field('date');

// Usage:
<div>
    Date Value: <?php echo esc_html($date_value); ?>
</div>`}</pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Relationship Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🔗</span>
                Relationship Field
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Relationship Field</h3>
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
                </div>
              </div>
            </section>

            {/* Complex Fields Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-n-1 mb-6 flex items-center">
                <span className="mr-3">🔄</span>
                Complex Field - Repeater
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-n-1 mb-3">Repeater Field</h3>
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
                </div>
              </div>
            </section>

            {/* Complete Example Section */}
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
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
            <section className="bg-n-8/80 backdrop-blur-sm border border-n-6 rounded-xl p-8">
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
