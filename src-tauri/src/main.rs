// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{process::Command, thread};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn run_downloader(path: String) -> String {
    let path = path.to_string();
    // Create a new thread
    let handle = thread::spawn(|| {
        // Specify the Python script you want to run
        let output = Command::new("python")
            .arg("./src/downloader.py")
            .arg(path)
            .output()
            .expect("Failed to execute script");

        // Check if the script executed successfully
        if output.status.success() {
            // Print the script output
            println!("Script output: {}", String::from_utf8_lossy(&output.stdout));
        } else {
            // Print the script error output
            eprintln!("Script error: {}", String::from_utf8_lossy(&output.stderr));
        }
    });

    // Wait for the thread to finish
    handle.join().unwrap();
    format!("{:?}", std::env::current_exe().unwrap())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![run_downloader])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
