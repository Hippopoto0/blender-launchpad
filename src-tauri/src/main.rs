// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{process::Command, thread};
use std::process::{Stdio};
use std::io::{self, BufRead, BufReader};

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[tauri::command]
async fn run_downloader(app: tauri::AppHandle, path: String) -> String {
    let path = path.to_string();
    // Create a new thread
    let handle = std::thread::spawn(move || {
        // Specify the Python script you want to run
        let mut child = Command::new("python")
            .arg("./src/downloader.py")
            .arg(path)
            .stdout(Stdio::piped())
            .spawn()
            .expect("Failed to execute script");


        // Get a handle to the stdout
        let stdout = child.stdout.as_mut().expect("Failed to capture stdout");

        // Create a BufReader for the stdout
        let reader = std::io::BufReader::new(stdout);

        // Iterate over the lines in the stdout
        for line in reader.lines() {
            match line {
                Ok(line) => {
                    println!("Script output: {}", line);
                    app.emit_all("message", Payload { message: line.into()}).unwrap();
                },
                Err(err) => eprintln!("Error reading line: {}", err),
            }
        }
        // // Check if the script executed successfully
        // if output.status.success() {
        //     // Print the script output
        //     println!("Script output: {}", String::from_utf8_lossy(&output.stdout));
        // } else {
        //     // Print the script error output
        //     eprintln!("Script error: {}", String::from_utf8_lossy(&output.stderr));
        // }
        
        // Wait for the child process to finish
        let _ = child.wait().expect("Child process wasn't running");
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
