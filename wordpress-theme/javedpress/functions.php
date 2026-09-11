<?php
if (!defined('ABSPATH')) exit;

function javedpress_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array('primary' => 'Primary Menu'));
}
add_action('after_setup_theme', 'javedpress_theme_setup');

function javedpress_defaults() {
    return array(
        'address' => '2096 Rodgran Lal Kuan Delhi - 110006',
        'business_hours' => '10:00 AM - 7:00 PM',
        'email' => 'javedpress@gmail.com',
        'creator_credit' => 'Created by Shariqa',
    );
}

function javedpress_customizer($wp_customize) {
    $wp_customize->add_section('javedpress_details', array('title' => 'Javed Press Details', 'priority' => 30));
    foreach (javedpress_defaults() as $key => $default) {
        $label = ucwords(str_replace('_', ' ', $key));
        $wp_customize->add_setting('javedpress_' . $key, array('default' => $default, 'sanitize_callback' => 'sanitize_text_field'));
        $wp_customize->add_control('javedpress_' . $key, array('section' => 'javedpress_details', 'label' => $label, 'type' => 'text'));
    }
}
add_action('customize_register', 'javedpress_customizer');

function javedpress_asset($pattern) {
    $matches = glob(get_template_directory() . '/assets/' . $pattern);
    return $matches ? basename($matches[0]) : '';
}

function javedpress_enqueue() {
    $css = javedpress_asset('index-*.css');
    $js = javedpress_asset('index-*.js');
    if ($css) wp_enqueue_style('javedpress-app', get_template_directory_uri() . '/assets/' . $css, array(), null);
    if ($js) {
        wp_enqueue_script('javedpress-app', get_template_directory_uri() . '/assets/' . $js, array(), null, true);
        wp_script_add_data('javedpress-app', 'type', 'module');
        $defaults = javedpress_defaults();
        $settings = array(
            'address' => get_theme_mod('javedpress_address', $defaults['address']),
            'business_hours' => get_theme_mod('javedpress_business_hours', $defaults['business_hours']),
            'email' => get_theme_mod('javedpress_email', $defaults['email']),
            'creator_credit' => get_theme_mod('javedpress_creator_credit', $defaults['creator_credit']),
            'asset_base' => trailingslashit(get_template_directory_uri() . '/assets'),
            'contact_endpoint' => admin_url('admin-post.php?action=javedpress_contact'),
        );
        wp_add_inline_script('javedpress-app', 'window.JAVEDPRESS_SETTINGS = ' . wp_json_encode($settings) . ';', 'before');
    }
}
add_action('wp_enqueue_scripts', 'javedpress_enqueue');

function javedpress_contact() {
    $to = get_theme_mod('javedpress_email', 'javedpress@gmail.com');
    $name = sanitize_text_field($_POST['Name'] ?? 'Website visitor');
    $email = sanitize_email($_POST['Email'] ?? '');
    $service = sanitize_text_field($_POST['Service'] ?? 'General enquiry');
    $message = sanitize_textarea_field($_POST['Project details'] ?? '');
    $body = "Name: {$name}\nEmail: {$email}\nService: {$service}\n\n{$message}";
    $headers = $email ? array('Reply-To: ' . $email) : array();
    $attachments = array();
    if (!empty($_FILES['attachment']['name'])) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        $upload = wp_handle_upload($_FILES['attachment'], array('test_form' => false));
        if (!isset($upload['error']) && !empty($upload['file'])) $attachments[] = $upload['file'];
    }
    wp_mail($to, 'New Javed Press enquiry', $body, $headers, $attachments);
    wp_safe_redirect(home_url('/contact/?sent=1'));
    exit;
}
add_action('admin_post_nopriv_javedpress_contact', 'javedpress_contact');
add_action('admin_post_javedpress_contact', 'javedpress_contact');

function javedpress_page_template($template) {
    if (is_front_page() || is_page(array('about', 'services', 'contact'))) {
        $theme_template = get_template_directory() . '/page-javedpress.php';
        if (file_exists($theme_template)) return $theme_template;
    }
    return $template;
}
add_filter('template_include', 'javedpress_page_template');

function javedpress_activate() {
    $pages = array('about' => 'About Us', 'services' => 'Services', 'contact' => 'Contact');
    foreach ($pages as $slug => $title) {
        if (!get_page_by_path($slug)) wp_insert_post(array('post_title' => $title, 'post_name' => $slug, 'post_status' => 'publish', 'post_type' => 'page'));
    }
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'javedpress_activate');

function javedpress_module_script($tag, $handle, $src) {
    if ($handle === 'javedpress-app') return '<script type="module" src="' . esc_url($src) . '"></script>';
    return $tag;
}
add_filter('script_loader_tag', 'javedpress_module_script', 10, 3);
