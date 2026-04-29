"use client"; // RemodelPro v3.0 - extras, lock, change orders, admin - 2026-04-23
/* eslint-disable react-hooks/exhaustive-deps, @next/next/no-img-element, react/no-unescaped-entities, no-unused-vars */
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ─── PRODUCT CATALOG (pre-loaded from WooCommerce) ─── */
const RAW_PRODUCTS = [{"i":"wc133","n":"Vanities - Shaker Navy Blue, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 24 inch vanity vs24 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc134","n":"Vanities - Shaker Navy Blue, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 27-30 INCH vs27    1) scribe molding.1) filler.1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc135","n":"Vanities - Shaker Navy Blue, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 30-33 INCH vs30   1) scribe molding.1) filler.1) toe kick","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc136","n":"Vanities - Shaker Navy Blue, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 36-39 INCH VANITY vsd36 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc137","n":"Vanities - Shaker Navy Blue, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 48-51 INCH VANITY  3vdb12  vs24  3vdb12   1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc138","n":"Vanities - Shaker Navy Blue, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 60-69 INCH VANITY 3vdb15  vs30  3vdb15   1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc139","n":"Vanities - Shaker Navy Blue, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 72-81INCH VANITY 3vdb18  vs36  3vdb18  1) scribe molding.  1) filler.  1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc140","n":"Vanities - Shaker Navy Blue, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 84-93 INCH VANITY 3vdb18  vsd48 3vdb18 1) Scribe. 3) Fillers. 1) Toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc141","n":"Vanities - Shaker Navy Blue, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 96-105 INCH VANITY v3021dl  vsd36  v3021dr 3) Fillers. 1) Toe kick. 1) Scribe.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc142","n":"Vanities - Shaker Navy Blue, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 108-117 INCH VANITY v3621dl  vsd36  v3621dr. 3) Fillers. 1) Scribe. 1) Toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc143","n":"Vanities - Shaker Navy Blue, Single Sink, 120-129 Inch Vanity","p":378.28,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 120-129 INCH VANITY vs3621dl vsd48 v3621dr 3) Fillers. 1) Toe kick. 1) Scribe.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc148","n":"Vanities - Shaker Navy Blue, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 48-54 INCH VANITY DOUBLE SINK vs24  vs24 1) scribe molding. 2) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc149","n":"Vanities - Shaker Navy Blue, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 60-69 INCH VANITY DOUBLE SINK vs24  3vdb12  vs24 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc150","n":"Vanities - Shaker Navy Blue, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 72-81 INCH VANITY DOUBLE SINK vs30  3vdb12  vs30 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc151","n":"Vanities - Shaker Navy Blue, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 84-93 INCH DOUBLE VANITY vs36 3vdb12 vs36. 3) Fillers.1) Toe kick.1) Scribe Molding.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc271","n":"Vanities - Shaker Navy Blue, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 90-99 INCH DOUBLE VANITY vs36  3vdb18  vs36. 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc272","n":"Vanities - Shaker Navy Blue, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 102-111 INCH DOUBLE VANITY vsd42  3vdb18  vsd42 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc273","n":"Vanities - Shaker Navy Blue, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","d":"NAVY BLUE SHAKER 114-123 INCH DOUBLE VANITY vsd48  3vdb18  vsd48 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Shaker Navy Blue","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc221","n":"Vanities - Aspen White, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 24-27 INCH VANITY vs24 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc222","n":"Vanities - Aspen White, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 27-30 INCH VANITY vs27 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc223","n":"Vanities - Aspen White, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 30-33 INCH VANITY vs30 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc224","n":"Vanities - Aspen White, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 36-39 INCH VANITY. vsd36 1) scribe molding. 1) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc225","n":"Vanities - Aspen White, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 48-57 INCH VANITY 3vdb12  vs24  3vdb12 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc226","n":"Vanities - Aspen White, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 60-69 INCH VANITY 3vdb15  vs30  3vdb15 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc227","n":"Vanities - Aspen White, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 72-81 INCH VANITY 3vdb18   vs36   3vdb18 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc228","n":"Vanities - Aspen White, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 84-93 INCH VANITY 3vdb18  vsd48 3vdb18 1) Scribe.3) Fillers.1) Toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc229","n":"Vanities - Aspen White, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE  96-105 INCH VANITY v3021dl  vsd36  v3021dr 3) Fillers.1) Toe kick.1) Scribe.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc230","n":"Vanities - Aspen White, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 108-117 INCH VANITY v3621dl  vsd36  v3621dr. 3) Fillers. 1) Scribe. 1) Toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc231","n":"Vanities - Aspen White, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 120-129 INCH VANITY vs3621dl vsd48 v3621dr 3) Fillers.1) Toe kick.1) Scribe.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc236","n":"Vanities - Aspen White, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 48-54 INCH DOUBLE SINK VANITY vs24   vs24 1) scribe molding. 2) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc237","n":"Vanities - Aspen White, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 60-69 INCH DOUBLKE VANITY SINK vs24   3vdb12   vs24 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc238","n":"Vanities - Aspen White, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 72-81 INCH DOUBLE SINK VANITY vs30  3vdb12  vs30 1) scribe molding. 3) filler. 1) toe kick.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc239","n":"Vanities - Aspen White, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 84-93 INCH DOUBLE VANITY vs36 3vdb12 vs36. 3) Fillers.1) Toe kick.1) Scribe Molding.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc295","n":"Vanities - Aspen White, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 90-99 INCH DOUBLE VANITY vs36  3vdb18  vs36. 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc296","n":"Vanities - Aspen White, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 102-111 INCH DOUBLE VANITY vsd42  3vdb18  vsd42 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc297","n":"Vanities - Aspen White, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","d":"ASPEN WHITE 114-123 INCH DOUBLE VANITY vsd48  3vdb18  vsd48 3) Fillers.1) Toe kick.1) Scribe molding.","sup":"DSI","f1l":"Color","f1v":"Aspen White","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5755","n":"Vanities - West Point Grey, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5756","n":"Vanities - West Point Grey, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5757","n":"Vanities - West Point Grey, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5758","n":"Vanities - West Point Grey, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5759","n":"Vanities - West Point Grey, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5760","n":"Vanities - West Point Grey, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5761","n":"Vanities - West Point Grey, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5762","n":"Vanities - West Point Grey, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5763","n":"Vanities - West Point Grey, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5764","n":"Vanities - West Point Grey, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5765","n":"Vanities - West Point Grey, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5766","n":"Vanities - West Point Grey, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5767","n":"Vanities - West Point Grey, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5768","n":"Vanities - West Point Grey, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5769","n":"Vanities - West Point Grey, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5770","n":"Vanities - West Point Grey, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5771","n":"Vanities - West Point Grey, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5772","n":"Vanities - West Point Grey, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"West Point Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5773","n":"Vanities - Winchester Grey, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5774","n":"Vanities - Winchester Grey, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5775","n":"Vanities - Winchester Grey, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5776","n":"Vanities - Winchester Grey, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5777","n":"Vanities - Winchester Grey, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5778","n":"Vanities - Winchester Grey, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5779","n":"Vanities - Winchester Grey, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5780","n":"Vanities - Winchester Grey, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5781","n":"Vanities - Winchester Grey, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5782","n":"Vanities - Winchester Grey, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5783","n":"Vanities - Winchester Grey, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5784","n":"Vanities - Winchester Grey, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5785","n":"Vanities - Winchester Grey, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5786","n":"Vanities - Winchester Grey, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5787","n":"Vanities - Winchester Grey, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5788","n":"Vanities - Winchester Grey, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5789","n":"Vanities - Winchester Grey, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5790","n":"Vanities - Winchester Grey, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Winchester Grey","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5791","n":"Vanities - Russet Hickory, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5792","n":"Vanities - Russet Hickory, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5793","n":"Vanities - Russet Hickory, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5794","n":"Vanities - Russet Hickory, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5795","n":"Vanities - Russet Hickory, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5796","n":"Vanities - Russet Hickory, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5797","n":"Vanities - Russet Hickory, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5798","n":"Vanities - Russet Hickory, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5799","n":"Vanities - Russet Hickory, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5800","n":"Vanities - Russet Hickory, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5801","n":"Vanities - Russet Hickory, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5802","n":"Vanities - Russet Hickory, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5803","n":"Vanities - Russet Hickory, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5804","n":"Vanities - Russet Hickory, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5805","n":"Vanities - Russet Hickory, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5806","n":"Vanities - Russet Hickory, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5807","n":"Vanities - Russet Hickory, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5808","n":"Vanities - Russet Hickory, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Russet Hickory","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5809","n":"Vanities - Hickory Shaker, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5810","n":"Vanities - Hickory Shaker, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5811","n":"Vanities - Hickory Shaker, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5812","n":"Vanities - Hickory Shaker, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5813","n":"Vanities - Hickory Shaker, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5814","n":"Vanities - Hickory Shaker, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5815","n":"Vanities - Hickory Shaker, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5816","n":"Vanities - Hickory Shaker, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5817","n":"Vanities - Hickory Shaker, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5818","n":"Vanities - Hickory Shaker, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5819","n":"Vanities - Hickory Shaker, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5820","n":"Vanities - Hickory Shaker, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5821","n":"Vanities - Hickory Shaker, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5822","n":"Vanities - Hickory Shaker, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5823","n":"Vanities - Hickory Shaker, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5824","n":"Vanities - Hickory Shaker, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5825","n":"Vanities - Hickory Shaker, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5826","n":"Vanities - Hickory Shaker, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5827","n":"Vanities - Florence Sage, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5828","n":"Vanities - Florence Sage, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5829","n":"Vanities - Florence Sage, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5830","n":"Vanities - Florence Sage, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5831","n":"Vanities - Florence Sage, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5832","n":"Vanities - Florence Sage, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5833","n":"Vanities - Florence Sage, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5834","n":"Vanities - Florence Sage, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5835","n":"Vanities - Florence Sage, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5836","n":"Vanities - Florence Sage, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5837","n":"Vanities - Florence Sage, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5838","n":"Vanities - Florence Sage, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5839","n":"Vanities - Florence Sage, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5840","n":"Vanities - Florence Sage, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5841","n":"Vanities - Florence Sage, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5842","n":"Vanities - Florence Sage, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5843","n":"Vanities - Florence Sage, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5844","n":"Vanities - Florence Sage, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Florence Sage","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5845","n":"Vanities - Cambridge Shaker, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5846","n":"Vanities - Cambridge Shaker, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5847","n":"Vanities - Cambridge Shaker, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5848","n":"Vanities - Cambridge Shaker, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5849","n":"Vanities - Cambridge Shaker, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5850","n":"Vanities - Cambridge Shaker, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5851","n":"Vanities - Cambridge Shaker, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5852","n":"Vanities - Cambridge Shaker, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5853","n":"Vanities - Cambridge Shaker, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5854","n":"Vanities - Cambridge Shaker, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5855","n":"Vanities - Cambridge Shaker, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5856","n":"Vanities - Cambridge Shaker, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5857","n":"Vanities - Cambridge Shaker, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5858","n":"Vanities - Cambridge Shaker, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5859","n":"Vanities - Cambridge Shaker, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5860","n":"Vanities - Cambridge Shaker, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5861","n":"Vanities - Cambridge Shaker, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5862","n":"Vanities - Cambridge Shaker, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5863","n":"Vanities - Summit White Shaker, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5864","n":"Vanities - Summit White Shaker, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5865","n":"Vanities - Summit White Shaker, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5866","n":"Vanities - Summit White Shaker, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5867","n":"Vanities - Summit White Shaker, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5868","n":"Vanities - Summit White Shaker, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5869","n":"Vanities - Summit White Shaker, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5870","n":"Vanities - Summit White Shaker, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5871","n":"Vanities - Summit White Shaker, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5872","n":"Vanities - Summit White Shaker, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5873","n":"Vanities - Summit White Shaker, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5874","n":"Vanities - Summit White Shaker, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5875","n":"Vanities - Summit White Shaker, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5876","n":"Vanities - Summit White Shaker, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5877","n":"Vanities - Summit White Shaker, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5878","n":"Vanities - Summit White Shaker, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5879","n":"Vanities - Summit White Shaker, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5880","n":"Vanities - Summit White Shaker, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5881","n":"Vanities - Modern Black Shaker, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5882","n":"Vanities - Modern Black Shaker, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5883","n":"Vanities - Modern Black Shaker, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5884","n":"Vanities - Modern Black Shaker, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5885","n":"Vanities - Modern Black Shaker, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5886","n":"Vanities - Modern Black Shaker, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5887","n":"Vanities - Modern Black Shaker, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5888","n":"Vanities - Modern Black Shaker, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5889","n":"Vanities - Modern Black Shaker, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5890","n":"Vanities - Modern Black Shaker, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5891","n":"Vanities - Modern Black Shaker, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5892","n":"Vanities - Modern Black Shaker, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5893","n":"Vanities - Modern Black Shaker, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5894","n":"Vanities - Modern Black Shaker, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5895","n":"Vanities - Modern Black Shaker, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5896","n":"Vanities - Modern Black Shaker, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5897","n":"Vanities - Modern Black Shaker, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5898","n":"Vanities - Modern Black Shaker, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5899","n":"Vanities - Summit Platinum Shaker, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5900","n":"Vanities - Summit Platinum Shaker, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5901","n":"Vanities - Summit Platinum Shaker, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5902","n":"Vanities - Summit Platinum Shaker, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5903","n":"Vanities - Summit Platinum Shaker, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5904","n":"Vanities - Summit Platinum Shaker, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5905","n":"Vanities - Summit Platinum Shaker, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5906","n":"Vanities - Summit Platinum Shaker, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5907","n":"Vanities - Summit Platinum Shaker, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5908","n":"Vanities - Summit Platinum Shaker, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5909","n":"Vanities - Summit Platinum Shaker, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5910","n":"Vanities - Summit Platinum Shaker, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5911","n":"Vanities - Summit Platinum Shaker, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5912","n":"Vanities - Summit Platinum Shaker, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5913","n":"Vanities - Summit Platinum Shaker, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5914","n":"Vanities - Summit Platinum Shaker, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5915","n":"Vanities - Summit Platinum Shaker, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5916","n":"Vanities - Summit Platinum Shaker, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5917","n":"Vanities - Cottage Creme, Single Sink, 120-129 Inch Vanity","p":372.28,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"120-129 Inch Vanity"},{"i":"wc5918","n":"Vanities - Cottage Creme, Single Sink, 108-117 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"108-117 Inch Vanity"},{"i":"wc5919","n":"Vanities - Cottage Creme, Single Sink, 96-105 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"96-105 Inch Vanity"},{"i":"wc5920","n":"Vanities - Cottage Creme, Single Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5921","n":"Vanities - Cottage Creme, Single Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5922","n":"Vanities - Cottage Creme, Single Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5923","n":"Vanities - Cottage Creme, Single Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"wc5924","n":"Vanities - Cottage Creme, Single Sink, 36-39 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"36-39 Inch Vanity"},{"i":"wc5925","n":"Vanities - Cottage Creme, Single Sink, 30-33 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"30-33 Inch Vanity"},{"i":"wc5926","n":"Vanities - Cottage Creme, Single Sink, 27-30 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"27-30 Inch Vanity"},{"i":"wc5927","n":"Vanities - Cottage Creme, Single Sink, 24-27 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Single Sink","f3l":"Size","f3v":"24-27 Inch Vanity"},{"i":"wc5928","n":"Vanities - Cottage Creme, Double Sink, 114-123 Inch Vanity","p":186.04,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"114-123 Inch Vanity"},{"i":"wc5929","n":"Vanities - Cottage Creme, Double Sink, 102-111 Inch Vanity","p":32.32,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"102-111 Inch Vanity"},{"i":"wc5930","n":"Vanities - Cottage Creme, Double Sink, 90-99 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"90-99 Inch Vanity"},{"i":"wc5931","n":"Vanities - Cottage Creme, Double Sink, 84-93 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"84-93 Inch Vanity"},{"i":"wc5932","n":"Vanities - Cottage Creme, Double Sink, 72-81 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"72-81 Inch Vanity"},{"i":"wc5933","n":"Vanities - Cottage Creme, Double Sink, 60-69 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"60-69 Inch Vanity"},{"i":"wc5934","n":"Vanities - Cottage Creme, Double Sink, 48-57 Inch Vanity","p":0.0,"c":"Bathroom","s":"Vanities","sup":"DSI","f1l":"Color","f1v":"Cottage Creme","f2l":"Type","f2v":"Double Sink","f3l":"Size","f3v":"48-57 Inch Vanity"},{"i":"auto_bathtubsluxurysoakin_93857","n":"Bathtubs - LUXURY SOAKING ALCOVE TUB","p":3134.0,"c":"Bathroom","s":"Bathtub","sup":"DSI","f1l":"Size","f1v":"Soaking"},{"i":"MBA-S-6032","n":"Bathtubs - 32x60, Right Hand Drain","p":0.0,"c":"Bathroom","s":"Bathtub","d":"60.0\" x 32.0\", one-piece, vacuum formed acrylic bath with full apron, extra deep sump, and end drain RIGHT HAND DRAIN MBA-S-6032 Soaking &amp; Therapy","sup":"DSI","f1l":"Size","f1v":"32x60","f2l":"Type","f2v":"Right Hand Drain"},{"i":"auto_bathtubs32x60lefthan_28069","n":"Bathtubs - 32x60, Left Hand Drain","p":0.0,"c":"Bathroom","s":"Bathtub","d":"60.0\" x 32.0\", one-piece, vacuum formed acrylic bath with full apron, extra deep sump, and end drain LEFT HAND DRAIN MBA-S-6032  Soaking &amp; Therapy (PURITY)","sup":"DSI","f1l":"Size","f1v":"32x60","f2l":"Type","f2v":"Left Hand Drain"},{"i":"MB-S-6030-R","n":"Bathtubs - 30x60, Right Hand Drain","p":0.0,"c":"Bathroom","s":"Bathtub","d":"60.0\" x 30.0\", one-piece, sanitary grade gelcoat, fiberglass composite bath with full or partial apron, and end drain RIGHT DRAIN Purity, MB-S-6030-R Soaking &amp; Therapy","sup":"DSI","f1l":"Size","f1v":"30x60","f2l":"Type","f2v":"Right Hand Drain"},{"i":"MB-S-6030-L","n":"Bathtubs - 30x60, Left Hand Drain","p":0.0,"c":"Bathroom","s":"Bathtub","d":"60.0\" x 30.0\", one-piece, sanitary grade gelcoat, fiberglass composite bath with full or partial apron, and end drain LEFT DRAIN Purity, MB-S-6030-L Soaking &amp; Therapy","sup":"DSI","f1l":"Size","f1v":"30x60","f2l":"Type","f2v":"Left Hand Drain"},{"i":"auto_bathtubssoakinglefth_17135","n":"Bathtubs - Soaking, Left Hand Drain","p":0.0,"c":"Bathroom","s":"Bathtub","d":"60\" X 30\" White Soaking Tub - Soaking Depth 19\"","sup":"DSI","f1l":"Size","f1v":"Soaking","f2l":"Type","f2v":"Left Hand Drain"},{"i":"auto_bathtubssoakingright_91249","n":"Bathtubs - Soaking, Right Hand Drain","p":0,"c":"Bathroom","s":"Bathtub","d":"60\" X 30\" White Soaking Tub - Soaking Depth 19\"","sup":"DSI","f1l":"Size","f1v":"Soaking","f2l":"Type","f2v":"Right Hand Drain"},{"i":"wc1557","n":"Shower Pan - Custom, Custom","p":0.0,"c":"Bathroom","s":"Shower Pan","sup":"ETNA","f1l":"Type","f1v":"Custom","f2l":"Size","f2v":"Custom"},{"i":"SMFLU3636c","n":"Shower Pan - Center Drain, 36x36 Shower Pan","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"36x36 SHOWER PAN *CENTER DRAIN* Shower pan*   36 inch x 36 inch x2.6 inch","sup":"ETNA","f1l":"Type","f1v":"Center Drain","f2l":"Size","f2v":"36x36"},{"i":"bci881667","n":"Shower Pan - Center Drain, 60x60 Shower Pan","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"60 x 60 WHITE *CENTER DRAIN* Shower pan* Kohler Archer Single Threshold Center Drain Shower Base with Removable Drain Cover Model: K-9395-0","sup":"ETNA","f1l":"Type","f1v":"Center Drain","f2l":"Size","f2v":"60x60"},{"i":"SMFLU6030R-31","n":"Shower Pan - Right Hand Drain, 60x30","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"60x30  White RIGHT HAND DRAIN * Shower pan* Ultra low tub replacement","sup":"DSI","f1l":"Type","f1v":"Right Hand Drain","f2l":"Size","f2v":"60x30"},{"i":"SMFLU6032R-31","n":"Shower Pan - Right Hand Drain, 60x32","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"60x32 *WHITE* RIGHT HAND DRAIN * Shower pan* Ultra low tub replacement","sup":"DSI","f1l":"Type","f1v":"Right Hand Drain","f2l":"Size","f2v":"60x32"},{"i":"S3MFLU6030L-31","n":"Shower Pan - Left Hand Drain, 60x30","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"60x30  *White* LEFT HAND DRAIN * Shower pan* Ultra low tub replacement","sup":"DSI","f1l":"Type","f1v":"Left Hand Drain","f2l":"Size","f2v":"60x30"},{"i":"SMFLU6032L-31 White","n":"Shower Pan - Left Hand Drain, 60x32","p":0.0,"c":"Bathroom","s":"Shower Pan","d":"60x32 White LEFT HAND DRAIN  * Shower pan* Ultra low tub replacement","sup":"DSI","f1l":"Type","f1v":"Left Hand Drain","f2l":"Size","f2v":"60x32"},{"i":"wc1553","n":"Free Standing Tub - 55x29 Stone Composite Insulated Tub","p":10246.85,"c":"Bathroom","s":"Freestanding Tub","d":"55\" X 29\" Matte White  STONE COMPOSITE IS NATURALLY","sup":"ETNA","f1l":"Model","f1v":"55x29 Stone Composite"},{"i":"wc6579","n":"Free Standing Tub - 63x30 Stone Composite Insulated Tub","p":10246.85,"c":"Bathroom","s":"Freestanding Tub","d":"63\" X 30\" Matte White STONE COMPOSITE IS NATURALLY","sup":"ETNA","f1l":"Model","f1v":"63x30 Stone Composite"},{"i":"wc6580","n":"Free Standing Tub - 71x32 Stone Composite Insulated Tub","p":10246.85,"c":"Bathroom","s":"Freestanding Tub","d":"71\" X 32\" Matte White STONE COMPOSITE IS NATURALLY","sup":"ETNA","f1l":"Model","f1v":"71x32 Stone Composite"},{"i":"106384-000-001-000","n":"Free Standing Tub - MAAX LOUIE 5829 FREE STANDING BATH TUB","p":5619.13,"c":"Bathroom","s":"Freestanding Tub","d":"MAAX LOUIE 5829 FREE STANDING BATH TUB 58-1/4 L x 28-7/8 H *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"MAAX LOUIE 5829"},{"i":"106266-000-001-100","n":"Free Standing Tub - ARIOSA 6032 FREE STANDING BATHTUB WHITE","p":5676.0,"c":"Bathroom","s":"Freestanding Tub","d":"ARIOSA 6032 FREE STANDING BATHTUB 60x32x28  White  *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"ARIOSA 6032 White"},{"i":"106266-000-001-100 BLACK","n":"Free Standing Tub - ARIOSA 6032 FREE STANDING BATHTUB BLACK","p":6578.0,"c":"Bathroom","s":"Freestanding Tub","d":"ARIOSA 6032 106266-000-001-100 BLACK 60x32x28 *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"ARIOSA 6032 Black"},{"i":"Ariosa 6636","n":"Free Standing Tub - ARIOSA 6636 Acrylic Freestanding Center Drain Bathtub in White with White Skirt","p":6524.86,"c":"Bathroom","s":"Freestanding Tub","d":"Ariosa 6636 Acrylic Freestanding Center Drain Bathtub in White with White Skirt *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"ARIOSA 6636"},{"i":"107519-000-002-000","n":"Free Standing Tub - GOLAN 5829 AcrylX Freestanding Center Drain Bathtub in White with White Skirt","p":5208.92,"c":"Bathroom","s":"Freestanding Tub","d":"Golan 5829 AcrylX Freestanding Center Drain Bathtub in White with White Skirt *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"GOLAN 5829"},{"i":"105742","n":"Free Standing Tub - OPTIK 6636 F Acrylic Freestanding Center Drain Bathtub in White with White Skirt","p":6524.86,"c":"Bathroom","s":"Freestanding Tub","d":"Optik 6636 F Acrylic Freestanding Center Drain Bathtub in White with White Skirt Model number: 105742-000-001-100 *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"OPTIK 6636 F"},{"i":"105359-055-001","n":"Free Standing Tub - JAZZ F 66 x 36 Acrylic Freestanding Center Drain Aerofeel Bathtub in White with White Skirt","p":6136.98,"c":"Bathroom","s":"Freestanding Tub","d":"Jazz F 66 x 36 Acrylic Freestanding Center Drain Aerofeel Bathtub in White with White Skirt *MUST ADD TUB FILLER*","sup":"ETNA","f1l":"Model","f1v":"JAZZ F 66 x 36"},{"i":"DELTA T4759-FL","n":"Free Standing Tub Fillers - Floor Mounted Tub Filler, Chrome Delta","p":2317.48,"c":"Bathroom","s":"Tub Fillers","d":"CHROME DELTA T4759-FL TRINSIC FLOOR MOUNT TUBFILLER","sup":"ETNA","f1l":"Type","f1v":"Floor Mounted Tub Filler","f2l":"Color","f2v":"Chrome Delta ..."},{"i":"DELTA T4759-BLFL","n":"Free Standing Tub Fillers - Floor Mounted Tub Filler, Matte Black Delta","p":3530.57,"c":"Bathroom","s":"Tub Fillers","d":"MATTE BLACK DELTA T4759-BLFL TRINSIC FLOOR MOUNT TUBFILLER","sup":"ETNA","f1l":"Type","f1v":"Floor Mounted Tub Filler","f2l":"Color","f2v":"Matte Black D..."},{"i":"T4759-CZFL","n":"Free Standing Tub Fillers - Floor Mounted Tub Filler, Champagne Bronze","p":3708.31,"c":"Bathroom","s":"Tub Fillers","d":"Champagne Bronze Model #: T4759-CZFL Single Handle Floor Mount Tub Filler Trim with Hand Shower Single Handle Floor Mount Tub Filler Trim with Hand Shower In Champagne Bronze Model #: T4759-CZFL","sup":"ETNA","f1l":"Type","f1v":"Floor Mounted Tub Filler","f2l":"Color","f2v":"Champagne Bro..."},{"i":"DELTA T4733","n":"Free Standing Tub Fillers - Roman Tub Filler, Chrome Delta","p":800.67,"c":"Bathroom","s":"Tub Fillers","d":"DELTA T4733 KAYRA ROMAN TUB FILLER WITH HAND SHOWER CHROME","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Chrome Delta - Roman ..."},{"i":"auto_freestandingtubfille_65737","n":"Free Standing Tub Fillers - Roman Tub Filler, Matte Black Delta","p":1304.55,"c":"Bathroom","s":"Tub Fillers","d":"DELTA T4733  KAYRA ROMAN TUB FILLER WITH HAND SHOWER MATTE  BLACK","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Matte Black Delta - R..."},{"i":"auto_freestandingtubfille_48529","n":"Free Standing Tub Fillers - Roman Tub Filler, Stainless Steel Delta","p":1202.74,"c":"Bathroom","s":"Tub Fillers","d":"DELTA T4733  KAYRA ROMAN TUB FILLER WITH HAND SHOWER","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Stainless Steel Delta..."},{"i":"T4733-CZ","n":"Free Standing Tub Fillers - Roman Tub Filler, Champagne Bronze","p":1318.18,"c":"Bathroom","s":"Tub Fillers","d":"Roman Tub Trim With Hand Shower In Champagne Bronze Model #: T4733-CZ","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Champagne Bronze - Ro..."},{"i":"T2737","n":"Free Standing Tub Fillers - Roman Tub Filler, Chrome Velum","p":681.61,"c":"Bathroom","s":"Tub Fillers","d":"VELUM ROMAN TUB FILLER CHROME T2737","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Chrome Velum - Roman ..."},{"i":"T2737-CZ","n":"Free Standing Tub Fillers - Roman Tub Filler, Champagne Bronze Velum","p":1014.07,"c":"Bathroom","s":"Tub Fillers","d":"VELUM ROMAN TUB FILLER CHAMPAGNE BRONZE  T2737-CZ","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Champagne Bronze Velu..."},{"i":"T2737-BL","n":"Free Standing Tub Fillers - Roman Tub Filler, Matte Black Velum","p":966.33,"c":"Bathroom","s":"Tub Fillers","d":"VELUM ROMAN TUB FILLER MATTE BLACK T2737-BL","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Matte Black Velum - R..."},{"i":"T2737-SS","n":"Free Standing Tub Fillers - Roman Tub Filler, Stainless Steel Velum","p":919.74,"c":"Bathroom","s":"Tub Fillers","d":"VELUM ROMAN TUB FILLER  STAINLESS STEEL  T2737-SS","sup":"ETNA","f1l":"Type","f1v":"Roman Tub Filler","f2l":"Color","f2v":"Stainless Steel Velum..."},{"i":"DELTA T4759-SSFL","n":"Free Standing Tub Fillers - Floor Mounted Tub Filler, Brushed Nickle Delta","p":3244.12,"c":"Bathroom","s":"Tub Fillers","d":"BRUSHED NICKLE DELTA T4759-SSFL TRINSIC FLOOR MOUNT TUBFILLER","sup":"ETNA","f1l":"Type","f1v":"Floor Mounted Tub Filler","f2l":"Color","f2v":"Brushed Nickl..."},{"i":"DELT 15749LF","n":"Vanity Faucets - Nicoli Single Hole Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELT 15749LF CHROME DELTA NICOLI: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Single Hole Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 15749LF-BL","n":"Vanity Faucets - Nicoli Single Hole Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 15749LF-BL MATTE BLACK DELTA NICOLI: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Single Hole Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA 15749LF-SS","n":"Vanity Faucets - Nicoli Single Hole Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 15749LF-SS STAINLESS DELTA NICOLI: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Single Hole Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 15749LF-CZ","n":"Vanity Faucets - Nicoli Single Hole Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 15749LF-CZ CHAMPAGNE BRONZE DELTA NICOLI: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Single Hole Faucet","f2l":"Color","f2v":"Champagne Bronze Delta ..."},{"i":"DELTA 35749LF","n":"Vanity Faucets - Nicoli Wide Spread Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35749LF CHROME DELTA NICOLI TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Wide Spread Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 35749LF-BL","n":"Vanity Faucets - Nicoli Wide Spread Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35749LF-BL MATTE BLACK DELTA NICOLI: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Wide Spread Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA 35749LF-SS","n":"Vanity Faucets - Nicoli Wide Spread Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35749LF-SS STAINLESS DELTA NICOLI: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Wide Spread Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 35749LF-CZ","n":"Vanity Faucets - Nicoli Wide Spread Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35749LF-CZ CHAMPAGNE BRONZE TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Wide Spread Faucet","f2l":"Color","f2v":"Champagne Bronze Delta ..."},{"i":"DELTA 35849LF","n":"Vanity Faucets - Nicoli Square Wide Spread Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35849LF NICOLI TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER CHROME","sup":"ETNA","f1l":"Style","f1v":"Nicoli Square Wide Spread Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 35849LF-BL","n":"Vanity Faucets - Nicoli Square Wide Spread Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35849LF-BL MATTE BLACK DELTA NICOLI: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Square Wide Spread Faucet","f2l":"Color","f2v":"Matte Black Delt..."},{"i":"DELTA 35849LF-SS","n":"Vanity Faucets - Nicoli Square Wide Spread Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 35849LF-SS STAINLESS DELTA NICOLI: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Square Wide Spread Faucet","f2l":"Color","f2v":"Stainless Delta ..."},{"i":"DELTA 35849LF-CZ","n":"Vanity Faucets - Nicoli Square Wide Spread Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELT 35849LF-CZ CHAMPAGNE BRONZE TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Nicoli Square Wide Spread Faucet","f2l":"Color","f2v":"Champagne Bronze..."},{"i":"DELTA 537-MPU-DST","n":"Vanity Faucets - Velum Single Hole Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 537-MPU-DST CHROME DELTA VELUM: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Single Hole Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 537-BLMPU-DST","n":"Vanity Faucets - Velum Single Hole Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 537-BLMPU-DST MATTE BLACK DELTA VELUM: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Single Hole Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA 537-SSMPU-DST","n":"Vanity Faucets - Velum Single Hole Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 537-SSMPU-DST STAINLESS STEEL VELUM SINGLE HANDLE FAUCET","sup":"ETNA","f1l":"Style","f1v":"Velum Single Hole Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 537-CZMPU-DST","n":"Vanity Faucets - Velum Single Hole Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 537-CZMPU-DST CHAMPAGNE BRONZE DELTA VELUM: SINGLE HANDLE BATHROOM FAUCET SINGLE HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Single Hole Faucet","f2l":"Color","f2v":"Champagne Bronze Delta -..."},{"i":"DELTA 3537LF-MPU","n":"Vanity Faucets - Velum Wide Spread Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 3537LF-MPU CHROME TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Wide Spread Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 3537LF-BLMPU","n":"Vanity Faucets - Velum Wide Spread Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 3537LF-BLMPU MATTE BLACK DELTA VELUM: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Wide Spread Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA 3537LF-SSMPU","n":"Vanity Faucets - Velum Wide Spread Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 3537LF-SSMPU STAINLESS DELTA VELUM: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Wide Spread Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 3537LF-CZMPU","n":"Vanity Faucets - Velum Wide Spread Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"DELTA 3537LF-CZMPU CHAMPAGNE BRONZE DELTA VELUM: TWO HANDLE WIDESPRD BATHROOM FAUCET TWO HANDLE LEVER","sup":"ETNA","f1l":"Style","f1v":"Velum Wide Spread Faucet","f2l":"Color","f2v":"Champagne Bronze Delta -..."},{"i":"35840LF-CZ","n":"Vanity Faucets - Arvo Wide Spread Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Brushed Gold Faucet 3 Hole, 8 Inch Widespread Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Champagne Bronze 35840LF-CZ - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Wide Spread Faucet","f2l":"Color","f2v":"Champagne Bronze Delta"},{"i":"35840LF-SP","n":"Vanity Faucets - Arvo Wide Spread Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Brushed Nickel Faucet 3 Hole, 8 Inch Widespread Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Spotshield Stainless 35840LF-SP - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Wide Spread Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"35840LF-BL","n":"Vanity Faucets - Arvo Wide Spread Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Matte Black Bathroom Faucet 3 Hole, 8 Inch Widespread Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Matte Black 35840LF-BL - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Wide Spread Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"35840LF","n":"Vanity Faucets - Arvo Wide Spread Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Chrome Bathroom Faucet 3 Hole, 8 Inch Widespread Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Chrome 35840LF - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Wide Spread Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"15840LF-CZ","n":"Vanity Faucets - Arvo Single Hole Faucet, Champagne Bronze Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Brushed Gold Bathroom Faucet 1 Hole, Single Hole Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Champagne Bronze 15840LF-CZ - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Single Hole Faucet","f2l":"Color","f2v":"Champagne Bronze Delta"},{"i":"15840LF-SP","n":"Vanity Faucets - Arvo Single Hole Faucet, Stainless Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Brushed Nickel Bathroom Faucet 1 Hole, Single Hole Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Spotshield Stainless 15840LF-SP - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Single Hole Faucet","f2l":"Color","f2v":"Stainless Delta"},{"i":"15840LF-BL","n":"Vanity Faucets - Arvo Single Hole Faucet, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Matte Black Bathroom Faucet 1 Hole, Single Hole Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Matte Black 15840LF-BL - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Single Hole Faucet","f2l":"Color","f2v":"Matte Black Delta"},{"i":"15840LF","n":"Vanity Faucets - Arvo Single Hole Faucet, Chrome Delta","p":0.0,"c":"Bathroom","s":"Vanity Faucets","d":"Delta Arvo Chrome Bathroom Faucet 1 Hole, Single Hole Bathroom Sink Faucet for Vanity, Push-Pop Drain Assembly, Chrome 15840LF - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Single Hole Faucet","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc5296","n":"Vanity Mirror - Double Vanity Mirror, Brushed Gold - Double Vanity ...","p":459.79,"c":"Bathroom","s":"Vanity Mirror","d":"LOAAO 72X36' Gold Bathroom Mirror, Rounded Rectangle","sup":"ETNA","f1l":"Style","f1v":"Double Vanity Mirror","f2l":"Color","f2v":"Brushed Gold"},{"i":"wc5297","n":"Vanity Mirror - Double Vanity Mirror, Brushed Nickel - Double Vanit...","p":459.79,"c":"Bathroom","s":"Vanity Mirror","d":"LOAAO 72X36 Inch Brushed Nickel Bathroom Mirror, Rounded Rectangle","sup":"ETNA","f1l":"Style","f1v":"Double Vanity Mirror","f2l":"Color","f2v":"Brushed Nickel"},{"i":"wc5299","n":"Vanity Mirror - Double Vanity Mirror, Matte Black - Double Vanity M...","p":459.79,"c":"Bathroom","s":"Vanity Mirror","d":"LOAAO 72X36 Inch Black Metal Framed Bathroom Mirror","sup":"ETNA","f1l":"Style","f1v":"Double Vanity Mirror","f2l":"Color","f2v":"Matte Black"},{"i":"31367-CPL","n":"Vanity Mirror - Round Mirror, Chrome - Round Mirror, Chrome","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"CHROME 22 INCH ROUND - 31367-CPL ESSENTIAL ROUND MIRROR CHROME.","sup":"ETNA","f1l":"Style","f1v":"Round Mirror","f2l":"Color","f2v":"Chrome"},{"i":"31367-BNL","n":"Vanity Mirror - Round Mirror, Brushed Nickel - Round Mirror, Brushe...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED NICKEL 22 INCH - 31367-BNL ESSENTIAL ROUND MIRROR","sup":"ETNA","f1l":"Style","f1v":"Round Mirror","f2l":"Color","f2v":"Brushed Nickel"},{"i":"31367-BGL","n":"Vanity Mirror - Round Mirror, Brushed Gold - Round Mirror, Brushed ...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED GOLD 22 INCH - 31367-BGL ESSENTIAL ROUND MIRROR","sup":"ETNA","f1l":"Style","f1v":"Round Mirror","f2l":"Color","f2v":"Brushed Gold"},{"i":"31367-BLL","n":"Vanity Mirror - Round Mirror, Matte Black - Round Mirror, Matte Black","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"MATTE BLACK 22 INCH - 31367-BLL ESSENTIAL ROUND MIRROR.","sup":"ETNA","f1l":"Style","f1v":"Round Mirror","f2l":"Color","f2v":"Matte Black"},{"i":"30638-CPL","n":"Vanity Mirror - Arched Mirror, Chrome - Arched Mirror, Chrome","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"CHROME 20x32 - 30638-CPL ESSENTIAL ARCH MIRROR","sup":"ETNA","f1l":"Style","f1v":"Arched Mirror","f2l":"Color","f2v":"Chrome"},{"i":"30638-BNL","n":"Vanity Mirror - Arched Mirror, Brushed Nickel - Arched Mirror, Brus...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED NICKLE 20x32 - 30638-BNL ESSENTIAL ARCH MIRROR.","sup":"ETNA","f1l":"Style","f1v":"Arched Mirror","f2l":"Color","f2v":"Brushed Nickel"},{"i":"30638-BGL","n":"Vanity Mirror - Arched Mirror, Brushed Gold - Arched Mirror, Brushe...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED GOLD 20x32 - 30638-BGL ESSENTIAL ARCH MIRROR.","sup":"ETNA","f1l":"Style","f1v":"Arched Mirror","f2l":"Color","f2v":"Brushed Gold"},{"i":"30638-BLL","n":"Vanity Mirror - Arched Mirror, Matte Black - Arched Mirror, Matte B...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"MATTE BLACK 20x32 - 30638-BLL ESSENTIAL ARCH MIRROR","sup":"ETNA","f1l":"Style","f1v":"Arched Mirror","f2l":"Color","f2v":"Matte Black"},{"i":"26052-CPL","n":"Vanity Mirror - 22x34 Rectangle Mirror, Chrome - 22x34 Rectangle Mi...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"CHROME 22x34 - 26052-CPL ESSENTIAL RECTANGLE MIRROR","sup":"AMZ","f1l":"Style","f1v":"22x34 Rectangle Mirror","f2l":"Color","f2v":"Chrome"},{"i":"26052-BNL","n":"Vanity Mirror - 22x34 Rectangle Mirror, Brushed Nickel - 22x34 Rect...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED NICKLE 22x34 - 26052-BNL ESSENTIAL RECTANGLE MIRROR.","sup":"AMZ","f1l":"Style","f1v":"22x34 Rectangle Mirror","f2l":"Color","f2v":"Brushed Nickel"},{"i":"26052-BGL","n":"Vanity Mirror - 22x34 Rectangle Mirror, Brushed Gold - 22x34 Rectan...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED GOLD 22x34 - 26052-BGL ESSENTIAL RECTANGLE MIRROR","sup":"AMZ","f1l":"Style","f1v":"22x34 Rectangle Mirror","f2l":"Color","f2v":"Brushed Gold"},{"i":"26052-BLL","n":"Vanity Mirror - 22x34 Rectangle Mirror, Matte Black - 22x34 Rectang...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"MATTE BLACK 22x34 - 26052-BLL KOHLER ESSENTIAL RECTANGLE MIRROR","sup":"AMZ","f1l":"Style","f1v":"22x34 Rectangle Mirror","f2l":"Color","f2v":"Matte Black"},{"i":"31364-CPL","n":"Vanity Mirror - 24x36 Rectangle Mirror, Chrome - 24x36 Rectangle Mi...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"CHROME 24X36 - 31364-CPL ESSENTIAL RECTANGLE MIRROR.","sup":"AMZ","f1l":"Style","f1v":"24x36 Rectangle Mirror","f2l":"Color","f2v":"Chrome"},{"i":"31364-BNL","n":"Vanity Mirror - 24x36 Rectangle Mirror, Brushed Nickel - 24x36 Rect...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED NICKLE 24X36 - 31364-BNL ESSENTIAL RECTANGLE MIRROR.","sup":"AMZ","f1l":"Style","f1v":"24x36 Rectangle Mirror","f2l":"Color","f2v":"Brushed Nickel"},{"i":"31364-BGL","n":"Vanity Mirror - 24x36 Rectangle Mirror, Brushed Gold - 24x36 Rectan...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"BRUSHED GOLD 24X36 - 31364-BGL ESSENTIAL RECTANGLE MIRROR.","sup":"AMZ","f1l":"Style","f1v":"24x36 Rectangle Mirror","f2l":"Color","f2v":"Brushed Gold"},{"i":"31364-BLL","n":"Vanity Mirror - 24x36 Rectangle Mirror, Matte Black - 24x36 Rectang...","p":200.0,"c":"Bathroom","s":"Vanity Mirror","d":"MATTE BLACK 24X36 - 31364-BLL ESSENTIAL RECTANGLE MIRROR.","sup":"AMZ","f1l":"Style","f1v":"24x36 Rectangle Mirror","f2l":"Color","f2v":"Matte Black"},{"i":"wc497","n":"Vanity Mirror - Lighted Mirror Vertical, Lighted Mirror - Lighted M...","p":0.0,"c":"Bathroom","s":"Vanity Mirror","d":"ANTI-FOG, DIMMABLE BACKLIT &amp; FRONT LIGHTED VANITY MIRROR TMPERED GLASS .  MANY SIZES AVAILABLE VERTICAL AND HORIZONATAL   USE LINK BELOW TO SELECT SIZE  https://a.co/d/6KYAnql","sup":"AMZ","f1l":"Style","f1v":"Lighted Mirror Vertical","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc498","n":"Vanity Mirror - Lighted Mirror Horizontal, Lighted Mirror - Lighted...","p":0.0,"c":"Bathroom","s":"Vanity Mirror","d":"MANY SIZES AVAILABLE  USE LINK BELOW TO SELECT SIZE  ANTI-FOG, DIMMABLE BACKLIT &amp; FRONT LIGHTED VANITY MIRROR TMPERED GLASS .  MANY SIZES AVAILABLE VERTICAL AND HORIZONATAL   USE LINK BELOW TO SELECT SIZE  https://a.co/d/6KYAnql","sup":"AMZ","f1l":"Style","f1v":"Lighted Mirror Horizontal","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc499","n":"Vanity Mirror - Lighted Mirror Round, Lighted Mirror - Lighted Mirr...","p":0.0,"c":"Bathroom","s":"Vanity Mirror","d":"ROUND LIGHTED MIRROR (MULTIPLE SIZE OPTIONS) LED Bathroom Mirror with Front and Backlit, Anti-Fog, 3 Colors and Dimmable Light  Use link to  see sizing options  https://a.co/d/8cd3tY8","sup":"AMZ","f1l":"Style","f1v":"Lighted Mirror Round","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc6566","n":"Vanity Mirror - 72x36 Lighted Mirror, Lighted Mirror - 72x36 Lighte...","p":3402.62,"c":"Bathroom","s":"Vanity Mirror","d":"Minimum 42\" Height Clearance","sup":"AMZ","f1l":"Style","f1v":"72x36 Lighted Mirror","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc6567","n":"Vanity Mirror - 60x36 Lighted Mirror, Lighted Mirror - 60x36 Lighte...","p":2702.36,"c":"Bathroom","s":"Vanity Mirror","d":"Minimum 42\" Height Clearance","sup":"AMZ","f1l":"Style","f1v":"60x36 Lighted Mirror","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc6568","n":"Vanity Mirror - 48x36 Lighted Mirror, Lighted Mirror - 48x36 Lighte...","p":2501.88,"c":"Bathroom","s":"Vanity Mirror","d":"Minimum 42\" Height Clearance","sup":"AMZ","f1l":"Style","f1v":"48x36 Lighted Mirror","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc6569","n":"Vanity Mirror - 48x32 Lighted Mirror, Lighted Mirror - 48x32 Lighte...","p":2751.88,"c":"Bathroom","s":"Vanity Mirror","d":"Minimum 38\" Height Clearance","sup":"AMZ","f1l":"Style","f1v":"48x32 Lighted Mirror","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc6570","n":"Vanity Mirror - 24x32 Lighted Mirror, Lighted Mirror - 24x32 Lighte...","p":2451.88,"c":"Bathroom","s":"Vanity Mirror","sup":"AMZ","f1l":"Style","f1v":"24x32 Lighted Mirror","f2l":"Color","f2v":"Lighted Mirror"},{"i":"wc504","n":"Tops - LAZA - LAZA","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LAZA"},{"i":"wc505","n":"Tops - SPARKELING WHITE - SPARKELING WHITE","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKELING WHITE"},{"i":"wc506","n":"Tops - ANTIQUE GOLD - ANTIQUE GOLD","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"ANTIQUE GOLD"},{"i":"wc507","n":"Tops - CARRARA - CARRARA","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"CARRARA"},{"i":"wc508","n":"Tops - LEARY GOLD - LEARY GOLD","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LEARY GOLD"},{"i":"wc509","n":"Tops - LEARY GREY - LEARY GREY","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LEARY GREY"},{"i":"wc510","n":"Tops - PURE WHITE - PURE WHITE","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"PURE WHITE"},{"i":"wc511","n":"Tops - RIVER BLACK - RIVER BLACK","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"RIVER BLACK"},{"i":"wc512","n":"Tops - SKY BLUE - SKY BLUE","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SKY BLUE"},{"i":"wc513","n":"Tops - SPARKLING BLACK - SPARKLING BLACK","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKLING BLACK"},{"i":"wc514","n":"Tops - SPARKLING MONT - SPARKLING MONT","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKLING MONT"},{"i":"wc515","n":"Tops - SUN GREY - SUN GREY","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SUN GREY"},{"i":"wc516","n":"Tops - VADARA - VADARA","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"VADARA"},{"i":"wc517","n":"Tops - VENETIAN GREY - VENETIAN GREY","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"VENETIAN GREY"},{"i":"wc518","n":"Tops - MARMI - MARMI","p":0.0,"c":"Bathroom","s":"Vanity Tops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"MARMI"},{"i":"# 6994875","n":"Lighting - Matte Black, 1 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE *MATTE BLACK* ONE-LIGHT    VANITY LIGHTING     REVERSABLE # 6994875 Width/Dia:                5\"              Height:                      16.25\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103181","n":"Lighting - Matte Black, 1 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN ONE-LIGHT VANITY LIGHTING REVERSABLE MATTE BLACK #6103181 Width / Diameter: 5.00\"  Height: 14.75\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Madden"},{"i":"#6990429","n":"Lighting - Matte Black, 1 Light, Crosby","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY ONE-LIGHT WALL  SCONCE MATTE BLACK #6990429 Width        4.50\"     Height:      9.25\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Crosby"},{"i":"#6990898","n":"Lighting - Matte Black, 2 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE TWO-LIGHT VANITY LIGHTING MATTE BLACK ITEM         REVERSABLE         #6990898 WIDTH:                13.50\"  HEIGHT                   7.75\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103180","n":"Lighting - Matte Black, 2 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN TWO-LIGHT VANITY LIGHTING REVERSABLE MATTE BLACK ITEM #6103180 WIDTH:                14.25\"  HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Madden"},{"i":"#6397382","n":"Lighting - Matte Black, 2 Light, Kennewick","p":250.0,"c":"Bathroom","s":"Lighting","d":"KENNEWICK TWO-LIGHT VANITY LIGHT MATTE BLACK #6397382 Width      13.25\"  Height:      9.75\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Kennewick"},{"i":"#6990419","n":"Lighting - Matte Black, 2 Light, Winslow","p":250.0,"c":"Bathroom","s":"Lighting","d":"WINSLOW TWO-LIGHT CLEAR SEEDED GLASS VANITY LIGHT  MATTE BLACK #6990419 Width        13.00\"  Height:        9.25\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Winslow"},{"i":"#6990895","n":"Lighting - Matte Black, 3 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE THREE-LIGHT VANITY LIGHTING MATTE BLACK REVERSABLE #6990895 WIDTH:                 23.00\"  HEIGHT                   8.25\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103103","n":"Lighting - Matte Black, 3 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN THREE-LIGHT VANITY LIGHTING REVERSABLE MATTE BLACK ITEM #6103103 WIDTH:                24.00\"  HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Madden"},{"i":"#6397381","n":"Lighting - Matte Black, 3 Light, Kennewick","p":250.0,"c":"Bathroom","s":"Lighting","d":"KENNEWICK THREE-LIGHT VANITY LIGHT MATTE BLACK #6397381 Width / Diameter         22.75\"  Height                              9.75","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Kennewick"},{"i":"#6990416","n":"Lighting - Matte Black, 3 Light, Winslow","p":250.0,"c":"Bathroom","s":"Lighting","d":"WINSLOW THREE-LIGHT CLEAR SEEDED GLASS VANITY LIGHT  MATTE BLACK #6990416 Width             21.50\"  Height              9.25\"","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Winslow"},{"i":"#6990897","n":"Lighting - Brushed Nickel/Stainless, 1 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE ONE-LIGHT VANITY LIGHTING  BRUSHED NICKEL     REVERSABLE       #6990897 Width      5.00\"  Height  16.25\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103188","n":"Lighting - Brushed Nickel/Stainless, 1 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN ONE-LIGHT VANITY LIGHTING BRUSHED NICKEL  #6103188 Width 5.00\"  Height:14.75\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Madden"},{"i":"#803739","n":"Lighting - Brushed Nickel/Stainless, 1 Light, Crosby","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY ONE-LIGHT WALL  SCONCE BRUSHED NICKEL FROSTED GLASS #803739 Width        4.50\"     Height:      9.25\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Crosby"},{"i":"#6990890","n":"Lighting - Brushed Nickel/Stainless, 2 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE TWO-LIGHT VANITY LIGHTING  BRUSHED NICKEL      REVERSABLE          #6990890 WIDTH:                13.50\"  HEIGHT                   7.75\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103106","n":"Lighting - Brushed Nickel/Stainless, 2 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN TWO-LIGHT VANITY LIGHTING REVERSABLE BRUSHED NICKEL ITEM #6103106 WIDTH:                14.25\"  HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Madden"},{"i":"#6676158","n":"Lighting - Brushed Nickel/Stainless, 2 Light, Kennewick","p":250.0,"c":"Bathroom","s":"Lighting","d":"KENNEWICK TWO-LIGHT VANITY LIGHT BRUSHED NICKEL #6676158 Width      13.25\"  Height:      9.75\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Kennewick"},{"i":"#075959","n":"Lighting - Brushed Nickel/Stainless, 2 Light, Brinley","p":250.0,"c":"Bathroom","s":"Lighting","d":"BRINLEY TWO-LIGHT GLASS VANITY LIGHT BRUSHED NICKEL #075959 Width / Diameter       15.75\"  Height                          10.25\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Brinley"},{"i":"#6990869","n":"Lighting - Brushed Nickel/Stainless, 3 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE THREE-LIGHT VANITY LIGHTING  BRUSHED NICKEL REVERSABLE  #6990869 WIDTH:                23.00\"  HEIGHT                  8.25\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103104","n":"Lighting - Brushed Nickel/Stainless, 3 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN THREE-LIGHT VANITY LIGHTING REVERSABLE BRUSHED NICKEL ITEM #6103104 WIDTH:                24.00\"   HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Madden"},{"i":"#6676155","n":"Lighting - Brushed Nickel/Stainless, 3 Light, Kennewick","p":250.0,"c":"Bathroom","s":"Lighting","d":"KENNEWICK THREE-LIGHT VANITY LIGHT BRUSHED NICKEL #6676155 Width / Diameter         22.75\"   Height                              9.75","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Kennewick"},{"i":"#075953","n":"Lighting - Brushed Nickel/Stainless, 3 Light, Brinley","p":250.0,"c":"Bathroom","s":"Lighting","d":"BRINLEY THREE-LIGHT GLASS VANITY LIGHT BRUSHED NICKEL #075953 Width / Diameter          24.00\"  Height                             10.25\"","sup":"RL","f1l":"Color","f1v":"Brushed Nickel/Stainless","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Brinley"},{"i":"#6103184","n":"Lighting - Chrome, 1 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN ONE-LIGHT VANITY LIGHTING REVERSABLE   CHROME   #6103184 Width / Diameter: 5.00\"  Height: 14.75\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Madden"},{"i":"#803765","n":"Lighting - Chrome, 1 Light, Crosby Etched","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY ONE-LIGHT  WALL  SCONCE ETCHED GLASS  CHROME #803765 Width / Diameter: 4.50\"  Height: 9.25\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Crosby Etched"},{"i":"#6103185","n":"Lighting - Chrome, 2 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN TWO-LIGHT VANITY LIGHTING REVERSABLE POLISHED CHROME #6103185 WIDTH:                14.25\"  HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Madden"},{"i":"#803733","n":"Lighting - Chrome, 2 Light, Crosby Etched","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY TWO-LIGHT  WALL  SCONCE ETCHED GLASS  CHROME #803733 Width / Diameter: 14.50\"  Height: 9.25\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Crosby Etched"},{"i":"#6434661","n":"Lighting - Chrome, 2 Light, Crosby Clear","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY TWO-LIGHT  WALL  SCONCE CLEAR GLASS  CHROME #6434661 Width / Diameter: 14.50\"  Height: 9.25\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Crosby Clear"},{"i":"#6103102","n":"Lighting - Chrome, 3 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN THREE-LIGHT VANITY LIGHTING REVERSABLE POLISHED CHROME #6103102 WIDTH:                24.00\"  HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Madden"},{"i":"#803734","n":"Lighting - Chrome, 3 Light, Crosby Etched","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY THREE-LIGHT  WALL  SCONCE ETCHED GLASS  CHROME #803734 Width / Diameter: 23.00\"  Height: 8.75\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Crosby Etched"},{"i":"#6434665","n":"Lighting - Chrome, 3 Light, Crosby Clear","p":250.0,"c":"Bathroom","s":"Lighting","d":"CROSBY THREE-LIGHT  WALL  SCONCE CLEAR GLASS  CHROME #6434665 Width / Diameter: 23.00\"  Height:8.75\"","sup":"RL","f1l":"Color","f1v":"Chrome","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Crosby Clear"},{"i":"#6379842","n":"Lighting - Champagne, 1 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE ONE-LIGHT VANITY LIGHTING  CHAMPAGNE BRONZE     REVERSABLE  #6379842 Width      5.00\"  Height  16.25\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103187","n":"Lighting - Champagne, 1 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN ONE-LIGHT VANITY LIGHTING CHAMPAGNE BRONZE  #6103187 Width 5.00\"  Height:14.75\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Madden"},{"i":"#6379841","n":"Lighting - Champagne, 2 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE TWO-LIGHT VANITY LIGHTING  CHAMPAGNE BRONZE     REVERSABLE       #6379841 WIDTH:                13.50\"  HEIGHT                   7.75\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103109","n":"Lighting - Champagne, 2 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN TWO-LIGHT VANITY LIGHTING REVERSABLE CHAMPAGNE BRONZE  #6103109 WIDTH:                14.25\"   HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Madden"},{"i":"#6345094","n":"Lighting - Champagne, 2 Light, Brinley","p":250.0,"c":"Bathroom","s":"Lighting","d":"BRINLEY TWO-LIGHT GLASS VANITY LIGHT CHAMPAGNE BRONZE #6345094 Width / Diameter       15.75\"   Height                          10.25\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"2 Light","f3l":"Style","f3v":"Brinley"},{"i":"#6379844","n":"Lighting - Champagne, 3 Light, Marette","p":250.0,"c":"Bathroom","s":"Lighting","d":"MARETTE THREE-LIGHT VANITY LIGHTING CHAMPAGNE BRONZE REVERSABLE  #6379844 Width/Dia           23\"  Height                   8.25\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Marette"},{"i":"#6103101","n":"Lighting - Champagne, 3 Light, Madden","p":250.0,"c":"Bathroom","s":"Lighting","d":"MADDEN THREE-LIGHT VANITY LIGHTING REVERSABLE CHAMPAGNE BRONZE #6103101 WIDTH:                24.00\"   HEIGHT               10.50\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Madden"},{"i":"#6345097","n":"Lighting - Champagne, 3 Light, Brinley","p":250.0,"c":"Bathroom","s":"Lighting","d":"BRINLEY THREE-LIGHT GLASS VANITY LIGHT CHAMPAGNE BRONZE  #6345097 Width / Diameter          24.00\"   Height                             10.25\"","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"3 Light","f3l":"Style","f3v":"Brinley"},{"i":"wc5334","n":"Lighting - Champagne, 1 Light, Pure Luxury Sconce","p":403.16,"c":"Bathroom","s":"Lighting","d":"PURE LUXURY Solid Crystal Sconce 1 EACH  good for all rooms gold or black","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Pure Luxury Sconce"},{"i":"wc5335","n":"Lighting - Matte Black, 1 Light, Pure Luxury Sconce","p":403.16,"c":"Bathroom","s":"Lighting","d":"PURE LUXURY Solid Crystal Sconce 1 EACH  good for all rooms gold or black","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Pure Luxury Sconce"},{"i":"wc5336","n":"Lighting - Champagne, 1 Light, Classic Luxury Sconce","p":413.16,"c":"Bathroom","s":"Lighting","d":"CLASSIC LUXURY SOLID CRYSTAL WALL SCONCE","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Classic Luxury Sconce"},{"i":"wc5337","n":"Lighting - Matte Black, 1 Light, Classic Luxury Sconce","p":413.16,"c":"Bathroom","s":"Lighting","d":"CLASSIC LUXURY SOLID CRYSTAL WALL SCONCE","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Classic Luxury Sconce"},{"i":"wc5338","n":"Lighting - Champagne, 1 Light, Pure Luxury Pendant","p":488.16,"c":"Bathroom","s":"Lighting","d":"PURE LUXURY SOLID CRYSTAL PENDANT","sup":"RL","f1l":"Color","f1v":"Champagne","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Pure Luxury Pendant"},{"i":"wc5339","n":"Lighting - Matte Black, 1 Light, Pure Luxury Pendant","p":488.16,"c":"Bathroom","s":"Lighting","d":"PURE LUXURY SOLID CRYSTAL PENDANT","sup":"RL","f1l":"Color","f1v":"Matte Black","f2l":"Type","f2v":"1 Light","f3l":"Style","f3v":"Pure Luxury Pendant"},{"i":"CB-CLC2026FS","n":"Medicine Cabinets - Regular, 20 X 26 SINGLE DOOR BEVELED - NO MIRRO...","p":225.0,"c":"Bathroom","s":"Medicine Cabinet","d":"**IN PLACE OF A MIRROR KOHLER CB-CLC2026FS 20 X 26 SINGLE DOOR BEVELED","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 26 SINGLE DOOR BEVELED"},{"i":"CB-CLC2026FS-Mirror","n":"Medicine Cabinets - Regular, 20 X 26 SINGLE DOOR BEVELED - Regular,...","p":788.0,"c":"Bathroom","s":"Medicine Cabinet","d":"KOHLER CB-CLC2026FS 20 X 26 SINGLE DOOR BEVELED","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 26 SINGLE DOOR BEVELED"},{"i":"CB-CLC2031BAN","n":"Medicine Cabinets - Regular, 20 X 31 BANCROFT CABINET - Regular, 20...","p":454.0,"c":"Bathroom","s":"Medicine Cabinet","d":"KOHLER CB-CLC2031BAN 20 X 31 BANCROFT CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 31 BANCROFT CABINET"},{"i":"KOHLER 3073-NA","n":"Medicine Cabinets - Regular, 20 X 31 MIRRORED CABINET - Regular, 20...","p":454.0,"c":"Bathroom","s":"Medicine Cabinet","d":"KOHLER 3073-NA ARCHER 20 X 31 MIRRORED CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 31 MIRRORED CABINET"},{"i":"auto_medicinecabinetsregu_38533","n":"Medicine Cabinets - Regular, 20 X 31 MIRRORED CABINET - NO MIRROR -...","p":178.0,"c":"Bathroom","s":"Medicine Cabinet","d":"**IN PLACE OF MIRROR  KOHLER 3073-NA ARCHER 20 X 31 MIRRORED CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 31 MIRRORED CABINET"},{"i":"auto_medicinecabinetsregu_27099","n":"Medicine Cabinets - Regular, 20 X 31 BANCROFT CABINET - NO MIRROR -...","p":178.0,"c":"Bathroom","s":"Medicine Cabinet","d":"*IN PLACE OF THE MIRROR  KOHLER CB-CLC2031BAN 20 X 31 BANCROFT CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"20 X 31 BANCROFT CABINET"},{"i":"Model: K-CB-CLC3026FS","n":"Medicine Cabinets - Regular, 30\" x 26\" Double Door Mirrored Medicin...","p":621.33,"c":"Bathroom","s":"Medicine Cabinet","d":"Kohler 30\" x 26\" Double Door Reversible Hinge Frameless Mirrored Medicine Cabinet","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"30\" x 26\" Double Door Mirrored Medicin.."},{"i":"55064-NA","n":"Medicine Cabinets - Regular, 30\" x 26\" Double Door Medicine Cabinet...","p":460.16,"c":"Bathroom","s":"Medicine Cabinet","d":"**IN PLACE OF THE MIRROR  Kohler 30\" x 26\" Double Door Reversible Hinge Frameless Mirrored Medicine Cabinet","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"30\" x 26\" Double Door Medicine Cabinet.."},{"i":"auto_medicinecabinetsligh_54267","n":"Medicine Cabinets - Lighted, HORIZONTAL LIGHTED MEDICINE CABINET - ...","p":2868.0,"c":"Bathroom","s":"Medicine Cabinet","d":"Lighted Medicine Cabinet with Mirror, 2 Door with 2 Outlets &amp; USB Ports, Defogger, Dimmer, Clock &amp; Temp, Surface Mount MULTIPLE SIZE OPTIONS SEE LINK BELOW https://a.co/d/3QO6awd","sup":"ETNA","f1l":"Type","f1v":"Lighted","f2l":"Model","f2v":"HORIZONTAL LIGHTED MEDICINE CABINET"},{"i":"auto_medicinecabinetsligh_22329","n":"Medicine Cabinets - Lighted, VERTICAL LIGHTED MEDICINE CABINET - Li...","p":2279.0,"c":"Bathroom","s":"Medicine Cabinet","d":"20'28 VERTICAL LIGHTED MEDICINE CABINET WITH LIGHTS, DEFOGGER, DIMMER, CLOCK &amp; TEMP  MUTLIPLE SIZES  SEE LINK BELOW https://a.co/d/e9Ml2kB","sup":"ETNA","f1l":"Type","f1v":"Lighted","f2l":"Model","f2v":"VERTICAL LIGHTED MEDICINE CABINET"},{"i":"auto_medicinecabinetsregu_32408","n":"Medicine Cabinets - Regular, 16 X 20 SINGLE DOOR BEVELED - NO MIRRO...","p":0.0,"c":"Bathroom","s":"Medicine Cabinet","d":"IN PLACE OF MIRROR - 16X20 SINGLE DOOR BEVELED MEDICINE CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"16 X 20 SINGLE DOOR BEVELED"},{"i":"auto_medicinecabinetsregu_01423","n":"Medicine Cabinets - Regular, 16 X 20 SINGLE DOOR BEVELED - Regular,...","p":388.0,"c":"Bathroom","s":"Medicine Cabinet","d":"16X20 SINGLE DOOR BEVELED MEDICINE CABINET","sup":"ETNA","f1l":"Type","f1v":"Regular","f2l":"Model","f2v":"16 X 20 SINGLE DOOR BEVELED"},{"i":"auto_medicinecabinetsligh_72998","n":"Medicine Cabinets - Lighted, 24 X 32 LIGHTED MEDICINE CABINET - Lig...","p":2521.36,"c":"Bathroom","s":"Medicine Cabinet","d":"MINIMUM 28\" WIDTH CLEARANCE REQUIRED","sup":"ETNA","f1l":"Type","f1v":"Lighted","f2l":"Model","f2v":"24 X 32 LIGHTED MEDICINE CABINET"},{"i":"auto_medicinecabinetsligh_56078","n":"Medicine Cabinets - Lighted, 60 X 32 LIGHTED MEDICINE CABINET - Lig...","p":5413.62,"c":"Bathroom","s":"Medicine Cabinet","d":"IN PLACE OF DOUBLE MIRROR ONLY \\n** NOT AN INSET ITEM **","sup":"ETNA","f1l":"Type","f1v":"Lighted","f2l":"Model","f2v":"60 X 32 LIGHTED MEDICINE CABINET"},{"i":"auto_medicinecabinetsabov_39078","n":"Medicine Cabinets - Above Toilet, 24 X 30 Cabinet - Above Toilet, 2...","p":0.0,"c":"Bathroom","s":"Medicine Cabinet","d":"24 X 30 Cabinet - Medicine Cabinet above the toilet","sup":"ETNA","f1l":"Type","f1v":"Above Toilet","f2l":"Model","f2v":"24 X 30 Cabinet"},{"i":"wc701","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 28-31 INCH WALL TO WALL VANITY  V","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc702","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 32-36 INCH WALL TO WALL VANITY  VS30  (2","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc703","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 37-42 INCH WALL TO WALL VANITY  VSD36  (","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc704","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 43-48 INCH WALL TO WALL VANITY  VSD42  (","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc705","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 55-60 INCH SINGLE SINK WALL TO WALL  3VD","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc706","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 61-66 SINGLE SINK WALL TO WALL VANITY  3","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc707","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 67-75 INCH SINGLE SINK WALL TO WALL VANI","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc708","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 76-81 SINGLE SINK WALL TO WALL VANITY  3","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc709","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 82-87 SINGLE SINK WALL TO WALL VA","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc710","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE 88-91 SINGLE SINK WALL TO WALL VANITY  3","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc711","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 92-99 SINGLE SINK WALL TO WALL VA","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc712","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 100-105 SINGLE SINK WALL TO WALL","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc713","n":"Wall To Wall Vanities - Single Sink, Navy Blue Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 106-111 INCH WALL TO WALL SINGLE","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc740","n":"Wall To Wall Vanities - Single Sink, Aspen White, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 28-31 INCH WALL TO WALL VANITY  VS27","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"28-31"},{"i":"wc741","n":"Wall To Wall Vanities - Single Sink, Aspen White, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 32-36 INCH WALL TO WALL VANITY  VS30","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"32-36"},{"i":"wc742","n":"Wall To Wall Vanities - Single Sink, Aspen White, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 37-42 INCH WALL TO WALL VANITY  VSD36","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"37-42"},{"i":"wc743","n":"Wall To Wall Vanities - Single Sink, Aspen White, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 43-48 INCH WALL TO WALL VANITY  VSD42","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"43-48"},{"i":"wc744","n":"Wall To Wall Vanities - Single Sink, Aspen White, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 55-60 INCH SINGLE SINK WALL TO WALL  3","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"55-60"},{"i":"wc745","n":"Wall To Wall Vanities - Single Sink, Aspen White, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 61-66 SINGLE SINK WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"61-66"},{"i":"wc746","n":"Wall To Wall Vanities - Single Sink, Aspen White, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 67-75 INCH SINGLE SINK WALL TO WALL VA","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"67-75"},{"i":"wc747","n":"Wall To Wall Vanities - Single Sink, Aspen White, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 76-81 SINGLE SINK WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"76-81"},{"i":"wc748","n":"Wall To Wall Vanities - Single Sink, Aspen White, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 82-87 SINGLE SINK WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"82-87"},{"i":"wc749","n":"Wall To Wall Vanities - Single Sink, Aspen White, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 88-91 SINGLE SINK WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"88-91"},{"i":"wc750","n":"Wall To Wall Vanities - Single Sink, Aspen White, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 92-99 SINGLE SINK WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"92-99"},{"i":"wc751","n":"Wall To Wall Vanities - Single Sink, Aspen White, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 100-105 SINGLE SINK WALL TO WALL VANIT","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"100-105"},{"i":"wc752","n":"Wall To Wall Vanities - Single Sink, Aspen White, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 106-111 INCH SINGLE SINK WALL TO WALL","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"106-111"},{"i":"wc6323","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"28-31"},{"i":"wc6324","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"32-36"},{"i":"wc6325","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"37-42"},{"i":"wc6326","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"43-48"},{"i":"wc6327","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"55-60"},{"i":"wc6328","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"61-66"},{"i":"wc6329","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"67-75"},{"i":"wc6330","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"76-81"},{"i":"wc6331","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"82-87"},{"i":"wc6332","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"88-91"},{"i":"wc6333","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"92-99"},{"i":"wc6334","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"100-105"},{"i":"wc6335","n":"Wall To Wall Vanities - Single Sink, West Point Grey, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"106-111"},{"i":"wc6338","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"28-31"},{"i":"wc6339","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"32-36"},{"i":"wc6340","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"37-42"},{"i":"wc6341","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"43-48"},{"i":"wc6342","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"55-60"},{"i":"wc6343","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"61-66"},{"i":"wc6344","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"67-75"},{"i":"wc6345","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"76-81"},{"i":"wc6346","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"82-87"},{"i":"wc6347","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"88-91"},{"i":"wc6348","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"92-99"},{"i":"wc6349","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"100-105"},{"i":"wc6350","n":"Wall To Wall Vanities - Single Sink, Winchester Grey, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"106-111"},{"i":"wc6351","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"28-31"},{"i":"wc6352","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"32-36"},{"i":"wc6353","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"37-42"},{"i":"wc6354","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"43-48"},{"i":"wc6355","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"55-60"},{"i":"wc6356","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"61-66"},{"i":"wc6357","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"67-75"},{"i":"wc6358","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"76-81"},{"i":"wc6359","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"82-87"},{"i":"wc6360","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"88-91"},{"i":"wc6361","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"92-99"},{"i":"wc6362","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"100-105"},{"i":"wc6363","n":"Wall To Wall Vanities - Single Sink, Russet Hickory, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"106-111"},{"i":"wc6364","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc6365","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc6366","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc6367","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc6368","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc6369","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc6370","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc6371","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6372","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6373","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc6374","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc6375","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc6376","n":"Wall To Wall Vanities - Single Sink, Hickory Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6377","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"28-31"},{"i":"wc6378","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"32-36"},{"i":"wc6379","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"37-42"},{"i":"wc6380","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"43-48"},{"i":"wc6381","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"55-60"},{"i":"wc6382","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"61-66"},{"i":"wc6383","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"67-75"},{"i":"wc6384","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"76-81"},{"i":"wc6385","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"82-87"},{"i":"wc6386","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"88-91"},{"i":"wc6387","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"92-99"},{"i":"wc6388","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"100-105"},{"i":"wc6389","n":"Wall To Wall Vanities - Single Sink, Florence Sage, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"106-111"},{"i":"wc6390","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc6391","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc6392","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc6393","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc6394","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc6395","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc6396","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc6397","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6398","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6399","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc6400","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc6401","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc6402","n":"Wall To Wall Vanities - Single Sink, Cambridge Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6403","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc6404","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc6405","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc6406","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc6407","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc6408","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc6409","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc6410","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6411","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6412","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc6413","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc6414","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc6415","n":"Wall To Wall Vanities - Single Sink, Summit White Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6416","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc6417","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc6418","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc6419","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc6420","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc6421","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc6422","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc6423","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6424","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6425","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc6426","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc6427","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc6428","n":"Wall To Wall Vanities - Single Sink, Modern Black Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6429","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"28-31"},{"i":"wc6430","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"32-36"},{"i":"wc6431","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"37-42"},{"i":"wc6432","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"43-48"},{"i":"wc6433","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"55-60"},{"i":"wc6434","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"61-66"},{"i":"wc6435","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"67-75"},{"i":"wc6436","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6437","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6438","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"88-91"},{"i":"wc6439","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"92-99"},{"i":"wc6440","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"100-105"},{"i":"wc6441","n":"Wall To Wall Vanities - Single Sink, Summit Platinum Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6442","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 28-31","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"28-31"},{"i":"wc6443","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 32-36","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"32-36"},{"i":"wc6444","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 37-42","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"37-42"},{"i":"wc6445","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 43-48","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"43-48"},{"i":"wc6446","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 55-60","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"55-60"},{"i":"wc6447","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 61-66","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"61-66"},{"i":"wc6448","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 67-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"67-75"},{"i":"wc6449","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"76-81"},{"i":"wc6450","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"82-87"},{"i":"wc6451","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 88-91","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"88-91"},{"i":"wc6452","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 92-99","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"92-99"},{"i":"wc6453","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 100-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"100-105"},{"i":"wc6454","n":"Wall To Wall Vanities - Single Sink, Cottage Creme, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Single Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"106-111"},{"i":"wc794","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 121-129 INCH WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc795","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 49-54 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc796","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 55-63 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc797","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 64-69 INCH DOUBLE SINK WALL TO WA","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc798","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 70-75 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc799","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 76-81 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc800","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 82-87 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc801","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 88-96 INCH WALL TO WALL VANITY DO","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc802","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 97-105 INCH WALL TO WALL VANITY D","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc803","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 112-120 INCH WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc804","n":"Wall To Wall Vanities - Double Sink, Navy Blue Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"NAVY BLUE SHAKER 106-111 INCH WALL TO WALL VANITY","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Navy Blue Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc834","n":"Wall To Wall Vanities - Double Sink, Aspen White, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 49-54 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"49-54"},{"i":"wc835","n":"Wall To Wall Vanities - Double Sink, Aspen White, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 55-63 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"55-63"},{"i":"wc836","n":"Wall To Wall Vanities - Double Sink, Aspen White, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 64-69 INCH DOUBLE SINK WALL TO WALL VA","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"64-69"},{"i":"wc837","n":"Wall To Wall Vanities - Double Sink, Aspen White, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 70-75 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"70-75"},{"i":"wc838","n":"Wall To Wall Vanities - Double Sink, Aspen White, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 76-81 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"76-81"},{"i":"wc839","n":"Wall To Wall Vanities - Double Sink, Aspen White, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 82-87 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"82-87"},{"i":"wc840","n":"Wall To Wall Vanities - Double Sink, Aspen White, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 88-96 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"88-96"},{"i":"wc841","n":"Wall To Wall Vanities - Double Sink, Aspen White, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 97-105 INCH WALL TO WALL VANITY DOUBLE","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"97-105"},{"i":"wc842","n":"Wall To Wall Vanities - Double Sink, Aspen White, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 112-120 INCH WALL TO WALL VANITY DOUBL","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"112-120"},{"i":"wc843","n":"Wall To Wall Vanities - Double Sink, Aspen White, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","d":"ASPEN WHITE 106-111 INCH WALL TO WALL VANITY DOUBL","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Aspen White","f3l":"Size","f3v":"106-111"},{"i":"wc6213","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"49-54"},{"i":"wc6214","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"55-63"},{"i":"wc6215","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"64-69"},{"i":"wc6216","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"70-75"},{"i":"wc6217","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"76-81"},{"i":"wc6218","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"82-87"},{"i":"wc6219","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"88-96"},{"i":"wc6220","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"97-105"},{"i":"wc6221","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"106-111"},{"i":"wc6222","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"112-120"},{"i":"wc6223","n":"Wall To Wall Vanities - Double Sink, West Point Grey, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"West Point Grey","f3l":"Size","f3v":"121-129"},{"i":"wc6224","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"49-54"},{"i":"wc6225","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"55-63"},{"i":"wc6226","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"64-69"},{"i":"wc6227","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"70-75"},{"i":"wc6228","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"76-81"},{"i":"wc6229","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"82-87"},{"i":"wc6230","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"88-96"},{"i":"wc6231","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"97-105"},{"i":"wc6232","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"106-111"},{"i":"wc6233","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"112-120"},{"i":"wc6234","n":"Wall To Wall Vanities - Double Sink, Winchester Grey, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Winchester Grey","f3l":"Size","f3v":"121-129"},{"i":"wc6235","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"49-54"},{"i":"wc6236","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"55-63"},{"i":"wc6237","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"64-69"},{"i":"wc6238","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"70-75"},{"i":"wc6239","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"76-81"},{"i":"wc6240","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"82-87"},{"i":"wc6241","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"88-96"},{"i":"wc6242","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"97-105"},{"i":"wc6243","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"106-111"},{"i":"wc6244","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"112-120"},{"i":"wc6245","n":"Wall To Wall Vanities - Double Sink, Russet Hickory, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Russet Hickory","f3l":"Size","f3v":"121-129"},{"i":"wc6246","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc6247","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc6248","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc6249","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc6250","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6251","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6252","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc6253","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc6254","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6255","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc6256","n":"Wall To Wall Vanities - Double Sink, Hickory Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Hickory Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc6257","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"49-54"},{"i":"wc6258","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"55-63"},{"i":"wc6259","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"64-69"},{"i":"wc6260","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"70-75"},{"i":"wc6261","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"76-81"},{"i":"wc6262","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"82-87"},{"i":"wc6263","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"88-96"},{"i":"wc6264","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"97-105"},{"i":"wc6265","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"106-111"},{"i":"wc6266","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"112-120"},{"i":"wc6267","n":"Wall To Wall Vanities - Double Sink, Florence Sage, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Florence Sage","f3l":"Size","f3v":"121-129"},{"i":"wc6268","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc6269","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc6270","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc6271","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc6272","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6273","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6274","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc6275","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc6276","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6277","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc6278","n":"Wall To Wall Vanities - Double Sink, Cambridge Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cambridge Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc6279","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc6280","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc6281","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc6282","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc6283","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6284","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6285","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc6286","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc6287","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6288","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc6289","n":"Wall To Wall Vanities - Double Sink, Summit White Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit White Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc6290","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc6291","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc6292","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc6293","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc6294","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6295","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6296","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc6297","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc6298","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6299","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc6300","n":"Wall To Wall Vanities - Double Sink, Modern Black Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Modern Black Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc6301","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"49-54"},{"i":"wc6302","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"55-63"},{"i":"wc6303","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"64-69"},{"i":"wc6304","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"70-75"},{"i":"wc6305","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"76-81"},{"i":"wc6306","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"82-87"},{"i":"wc6307","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"88-96"},{"i":"wc6308","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"97-105"},{"i":"wc6309","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"106-111"},{"i":"wc6310","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"112-120"},{"i":"wc6311","n":"Wall To Wall Vanities - Double Sink, Summit Platinum Shaker, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Summit Platinum Shaker","f3l":"Size","f3v":"121-129"},{"i":"wc6312","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 49-54","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"49-54"},{"i":"wc6313","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 55-63","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"55-63"},{"i":"wc6314","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 64-69","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"64-69"},{"i":"wc6315","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 70-75","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"70-75"},{"i":"wc6316","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 76-81","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"76-81"},{"i":"wc6317","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 82-87","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"82-87"},{"i":"wc6318","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 88-96","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"88-96"},{"i":"wc6319","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 97-105","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"97-105"},{"i":"wc6320","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 106-111","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"106-111"},{"i":"wc6321","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 112-120","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"112-120"},{"i":"wc6322","n":"Wall To Wall Vanities - Double Sink, Cottage Creme, 121-129","p":0.0,"c":"Bathroom","s":"Wall to Wall Vanity","sup":"DSI","f1l":"Type","f1v":"Double Sink","f2l":"Color","f2v":"Cottage Creme","f3l":"Size","f3v":"121-129"},{"i":"SMPPS1420UP-01PC","n":"Flip Up Shower Bench - White Flip Up Bench, Chrome","p":1201.1,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-01PC Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Polished Chrome","sup":"ETNA","f1l":"Color","f1v":"White Flip Up Bench","f2l":"Finish","f2v":"Chrome"},{"i":"SMPPS1420UP-01MB","n":"Flip Up Shower Bench - White Flip Up Bench, Matte Black","p":1221.32,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-01MB Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Matte Black Hardware","sup":"ETNA","f1l":"Color","f1v":"White Flip Up Bench","f2l":"Finish","f2v":"Matte Black"},{"i":"SMPPS1420UP-01CB","n":"Flip Up Shower Bench - White Flip Up Bench, Champagne","p":1240.3,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-01CB Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Champagne Bronze","sup":"ETNA","f1l":"Color","f1v":"White Flip Up Bench","f2l":"Finish","f2v":"Champagne"},{"i":"SMPPS1420UP-01BS","n":"Flip Up Shower Bench - White Flip Up Bench, Brushed Stainless","p":1201.01,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-01BS Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Brushed Stainless","sup":"ETNA","f1l":"Color","f1v":"White Flip Up Bench","f2l":"Finish","f2v":"Brushed Stainless"},{"i":"SMPPS1420UP-09PC","n":"Flip Up Shower Bench - Black Flip Up Bench, Chrome","p":1221.01,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-09PC Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Polished Chrome","sup":"ETNA","f1l":"Color","f1v":"Black Flip Up Bench","f2l":"Finish","f2v":"Chrome"},{"i":"SMPPS1420UP-09MB","n":"Flip Up Shower Bench - Black Flip Up Bench, Matte Black","p":1221.32,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-09MB Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Matte Black","sup":"ETNA","f1l":"Color","f1v":"Black Flip Up Bench","f2l":"Finish","f2v":"Matte Black"},{"i":"SMPPS1420UP-09CB","n":"Flip Up Shower Bench - Black Flip Up Bench, Champagne","p":1240.3,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-09CB Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Champagne Bronze","sup":"ETNA","f1l":"Color","f1v":"Black Flip Up Bench","f2l":"Finish","f2v":"Champagne"},{"i":"SMPPS1420UP-09BS","n":"Flip Up Shower Bench - Black Flip Up Bench, Brushed Stainless","p":1201.21,"c":"Bathroom","s":"Shower Benches","d":"SMPPS1420UP-09BS Penelope 14-in x 20-in x 2-in Fold Up Padded Shower Seat With Brushed Stainless","sup":"ETNA","f1l":"Color","f1v":"Black Flip Up Bench","f2l":"Finish","f2v":"Brushed Stainless"},{"i":"wc888","n":"Towel Bar Kit - Velum, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"CHROME VELUM TOWEL BAR KITS \\nDELTA IAO20846 CHROME DELTA VELUM: TOWEL RING \\nDELTA IAO20824 CHROME DELTA VELUM: TOWEL BAR 24 inch \\nDELTA IAO20836 CHROME DELTA BREVARD: ROBE HOOK \\nDELTA IAO20851 CHROME DELTA BREVARD: TISSUE HOLDER","sup":"ETNA","f1l":"Style","f1v":"Velum","f2l":"Color","f2v":"Chrome"},{"i":"wc889","n":"Towel Bar Kit - Velum, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"MATTE BLACK VELUM TOWEL BAR KIT \\nDELTA IAO20846-BL MATTE BLACK DELTA VELUM: TOWEL RING \\nDELTA IAO20824-BL MATTE BLACK DELTA VELUM: TOWEL BAR 24 inch \\nDELTA IAO20836-BL MATTE BLACK DELTA VELUM: ROBE HOOK  \\nDELTA IAO20851-BL MATTE BLACK DELTA VELUM: TISSUE HOLDER","sup":"ETNA","f1l":"Style","f1v":"Velum","f2l":"Color","f2v":"Matte Black"},{"i":"wc890","n":"Towel Bar Kit - Velum, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"CHAMPAGNE BRONZE DELTA VELUM TOWEL BAR KITS \\nDELTA IAO20846-CZ CHAMPAGNE BRONZE DELTA VELUM: TOWEL RING \\nDELTA IAO20824-CZ CHAMPAGNE BRONZE DELTA VELUM: TOWEL BAR 24 inch \\nDELTA IAO20836-CZ CHAMPAGNE BRONZE DELTA VELUM: ROBE HOOK  \\nDELTA IAO20851-CZ CHAMPAGNE BRONZE DELTA VELUM: TISSUE HOLDER","sup":"ETNA","f1l":"Style","f1v":"Velum","f2l":"Color","f2v":"Champagne"},{"i":"wc891","n":"Towel Bar Kit - Velum, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"STAINLESS  VELUM TOWEL BAR KITS \\nDELTA IAO20846-SS STAINLESS DELTA VELUM: TOWEL RING  \\nDELTA IAO20824-SS STAINLESS DELTA VELUM: TOWEL BAR 24 inch \\nDELTA IAO20836-SS STAINLESS DELTA VELUM: ROBE HOOK \\nDELTA IAO20851-SS STAINLESS DELTA VELUM: TISSUE HOLDER","sup":"ETNA","f1l":"Style","f1v":"Velum","f2l":"Color","f2v":"Stainless Steel"},{"i":"wc892","n":"Towel Bar Kit - Nicoli, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"CHROME NICOLI TOWEL BAR SET DELTA 759460 TRINSIC TOWEL RING CHROME DELTA 759240 CHROME DELTA TRINSIC: 24IN TOWEL BAR DELTA 75935 CHROME DELTA TRINSIC: ROBE HOOK DELTA 75950 TRINSIC TISSUE HOLDER CHROME","sup":"ETNA","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Chrome"},{"i":"wc893","n":"Towel Bar Kit - Nicoli, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"MATTE BLACK NICOLI TOWEL BAR SET DELTA 759460-BL TRINSIC TOWEL RING MATTE BLACK DELTA 759240-BL MATTE BLACK DELTA TRINSIC: 24IN TOWEL BAR DELTA 75935-BL MATTE BLACK DELTA TRINSIC: ROBE HOOK DELTA 75950-BL TRINSIC TISSUE HOLDER MATTE BLACK","sup":"ETNA","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Matte Black"},{"i":"wc894","n":"Towel Bar Kit - Nicoli, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"CHAMPAGNE BRONZE NICOLI TOWEL BAR SET DELTA 759460-CZ TRINSIC TOWEL RING CHAMPAGNE BRONZE  DELTA 759240-CZ TRINSIC 24 TOWEL BAR CHAMPAGNE BRONZE DELTA 75935-CZ TRINSIC ROBE HOOK CHAMPAGNE BRONZE  DELTA 75950-CZ TRINSIC TISSUE HOLDER CHAMPAGNE BRONZE","sup":"ETNA","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Champagne"},{"i":"wc895","n":"Towel Bar Kit - Nicoli, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"STAINLESS STEEL NICOLI TOWEL BAR SET DELTA 759460-SS TRINSIC TOWEL RING SS DELTA 759240-SS STAINLESS DELTA TRINSIC: 24IN TOWEL BAR DELTA 75935SS TRINSIC ROBE HOOK STAINLESS STEEL DELTA 75950-SS STAINLESS DELTA TRINSIC: TISSUE HOLDER","sup":"ETNA","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Stainless Steel"},{"i":"wc6668","n":"Towel Bar Kit - Tetra, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Tetra","f2l":"Color","f2v":"Stainless Steel"},{"i":"wc6669","n":"Towel Bar Kit - Tetra, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Tetra","f2l":"Color","f2v":"Champagne"},{"i":"wc6670","n":"Towel Bar Kit - Tetra, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Tetra","f2l":"Color","f2v":"Matte Black"},{"i":"wc6671","n":"Towel Bar Kit - Tetra, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Tetra","f2l":"Color","f2v":"Chrome"},{"i":"wc6703","n":"Towel Bar Kit - Trinsic, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Trinsic","f2l":"Color","f2v":"Stainless Steel"},{"i":"wc6704","n":"Towel Bar Kit - Trinsic, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Trinsic","f2l":"Color","f2v":"Champagne"},{"i":"wc6705","n":"Towel Bar Kit - Trinsic, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Trinsic","f2l":"Color","f2v":"Matte Black"},{"i":"wc6706","n":"Towel Bar Kit - Trinsic, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","sup":"ETNA","f1l":"Style","f1v":"Trinsic","f2l":"Color","f2v":"Chrome"},{"i":"wc5280","n":"Towel Bar Kit - Nicoli 18-24, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"4-Piece Stainless Steel Bathroom Set Towel Rack, Ring, Toilet Paper Holder, Hook | Nicoli Bath Accessories","sup":"ETNA","f1l":"Style","f1v":"Nicoli 18-24","f2l":"Color","f2v":"Stainless Steel - Nicoli 18-24"},{"i":"wc5281","n":"Towel Bar Kit - Nicoli 18-24, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"4-Piece Champagne Bronze Bathroom Set Towel Rack, Ring, Toilet Paper Holder, Hook | Nicoli Bath Accessories","sup":"ETNA","f1l":"Style","f1v":"Nicoli 18-24","f2l":"Color","f2v":"Champagne"},{"i":"wc5282","n":"Towel Bar Kit - Nicoli 18-24, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"4-Piece Matte Black Bathroom Set Towel Rack, Ring, Toilet Paper Holder, Hook | Nicoli Bath Accessories","sup":"ETNA","f1l":"Style","f1v":"Nicoli 18-24","f2l":"Color","f2v":"Matte Black"},{"i":"wc5283","n":"Towel Bar Kit - Nicoli 18-24, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"4-Piece Chrome Bathroom Set Towel Rack, Ring, Toilet Paper Holder, Hook | Nicoli Bath Accessories","sup":"ETNA","f1l":"Style","f1v":"Nicoli 18-24","f2l":"Color","f2v":"Chrome"},{"i":"BAS105-BN","n":"Towel Bar Kit - Stratford, Stainless Steel","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"JQK Bath Hardware Towel Bar Accessory Set, 5-Piece Bathroom Accessories Fixtures Set Brushed Finished Wall Mount Includes 24\" Towel Bar, 9\" Hand Towel Bar, Toilet Paper Holder, Robe Hook x2, BAS105-BN","sup":"ETNA","f1l":"Style","f1v":"Stratford","f2l":"Color","f2v":"Stainless Steel - Stratford"},{"i":"BAS105-CB","n":"Towel Bar Kit - Stratford, Champagne","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"JQK Bathroom Hardware Set, 5-Piece Bath Accessories Set Champagne Bronze Wall Mount Includes 24 in Towel Bar, 9 in HT Bar, TP Holder, Towel Hook x 2, BAS105-CB","sup":"ETNA","f1l":"Style","f1v":"Stratford","f2l":"Color","f2v":"Champagne"},{"i":"BAS105-PB","n":"Towel Bar Kit - Stratford, Matte Black","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"JQK Bathroom Hardware Set, 5-Piece Bath Accessories Set Matte Black Wall Mount Includes 24 in Towel Bar, 9 in HT Bar, TP Holder, Towel Hook x 2, BAS105-PB","sup":"ETNA","f1l":"Style","f1v":"Stratford","f2l":"Color","f2v":"Matte Black"},{"i":"BAS105-CH","n":"Towel Bar Kit - Stratford, Chrome","p":0.0,"c":"Bathroom","s":"Towel Bar Kits","d":"JQK Bathroom Hardware Towel Bar Set, 5-Piece Bath Accessories Set Polished Chrome Wall Mount Includes 24 in Towel Bar, 9 in HT Bar, TP Holder, Towel Hook x 2, BAS105-CH","sup":"ETNA","f1l":"Style","f1v":"Stratford","f2l":"Color","f2v":"Chrome"},{"i":"K-702429-L-SHP","n":"Shower Doors - 60 Inch Wide, Chrome","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHROME Levity' Plus Frameless sliding shower door, 81-5/8\" H x 56-5/8 - 59-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Wide","f2l":"Color","f2v":"Chrome"},{"i":"K-702429-L-BL","n":"Shower Doors - 60 Inch Wide, Matte Black","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"MATTE BLACK Levity' Plus Frameless sliding shower door, 81-5/8\" H x 56-5/8 - 59-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Wide","f2l":"Color","f2v":"Matte Black"},{"i":"K-702429-L-BNK","n":"Shower Doors - 60 Inch Wide, Brushed Nickel","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"BRUSHED NICKEL Levity' Plus Frameless sliding shower door, 81-5/8\" H x 56-5/8 - 59-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Wide","f2l":"Color","f2v":"Brushed Nickel"},{"i":"K-702429-L-2MB","n":"Shower Doors - 60 Inch Wide, Champagne","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHAMPAGNE BRONZE Levity' Plus Frameless sliding shower door, 81-5/8\" H x 56-5/8 - 59-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Wide","f2l":"Color","f2v":"Champagne"},{"i":"K-706009-L-SH","n":"Shower Doors - 60 Inch Soffit, Chrome","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHROME Levity' Sliding shower door, 74\" H x 56-5/8 - 59-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Soffit","f2l":"Color","f2v":"Chrome"},{"i":"K-706009-L-BL","n":"Shower Doors - 60 Inch Soffit, Matte Black","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"MATTE BLACK Levity' Sliding shower door, 74\" H x 56-5/8 - 59-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Soffit","f2l":"Color","f2v":"Matte Black"},{"i":"K-706009-L-MX","n":"Shower Doors - 60 Inch Soffit, Brushed Nickel","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"BRUSHED NICKEL Levity' Sliding shower door, 74\" H x 56-5/8 - 59-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Soffit","f2l":"Color","f2v":"Brushed Nickel"},{"i":"K-706009-L-2MB","n":"Shower Doors - 60 Inch Soffit, Champagne","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHAMPAGNE BRONZE Levity' Sliding shower door, 74\" H x 56-5/8 - 59-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"60 Inch Soffit","f2l":"Color","f2v":"Champagne"},{"i":"K-702427-L-SHP","n":"Shower Doors - 48 Inch Wide, Chrome","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHROME Levity' Plus Frameless sliding shower door, 81-5/8\" H x 44-5/8 - 47-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Wide","f2l":"Color","f2v":"Chrome"},{"i":"K-702427-L-BL","n":"Shower Doors - 48 Inch Wide, Matte Black","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"MATTE BLACK Levity' Plus Frameless sliding shower door, 81-5/8\" H x 44-5/8 - 47-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Wide","f2l":"Color","f2v":"Matte Black"},{"i":"K-702427-L-BNK","n":"Shower Doors - 48 Inch Wide, Brushed Nickel","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"BRUSHED NICKEL Levity' Plus Frameless sliding shower door, 81-5/8\" H x 44-5/8 - 47-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Wide","f2l":"Color","f2v":"Brushed Nickel"},{"i":"K-702427-L-2MB","n":"Shower Doors - 48 Inch Wide, Champagne","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHAMPAGNE BRONZE Levity' Plus Frameless sliding shower door, 81-5/8\" H x 44-5/8 - 47-5/8\" W, with 3/8\"-thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Wide","f2l":"Color","f2v":"Champagne"},{"i":"K-706008-L-SH","n":"Shower Doors - 48 Inch Soffit, Chrome","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHROME Levity' Sliding shower door, 74\" H x 43-5/8 - 47-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Soffit","f2l":"Color","f2v":"Chrome"},{"i":"K-706008-L-BL","n":"Shower Doors - 48 Inch Soffit, Matte Black","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"MATTE BLACK Levity' Sliding shower door, 74\" H x 43-5/8 - 47-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Soffit","f2l":"Color","f2v":"Matte Black"},{"i":"K-706008-L-MX","n":"Shower Doors - 48 Inch Soffit, Brushed Nickel","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"BRUSHED NICKEL Levity' Sliding shower door, 74\" H x 43-5/8 - 47-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Soffit","f2l":"Color","f2v":"Brushed Nickel"},{"i":"K-706008-L-2MB","n":"Shower Doors - 48 Inch Soffit, Champagne","p":3000.0,"c":"Bathroom","s":"Shower Doors","d":"CHAMPAGNE BRONZE Levity' Sliding shower door, 74\" H x 43-5/8 - 47-5/8\" W, with 1/4\" thick Crystal Clear glass","sup":"ETNA","f1l":"Size","f1v":"48 Inch Soffit","f2l":"Color","f2v":"Champagne"},{"i":"wc3213","n":"Shower Doors - Custom Size Door, Matte Black","p":4450.0,"c":"Bathroom","s":"Shower Doors","sup":"ETNA","f1l":"Size","f1v":"Custom Size Door","f2l":"Color","f2v":"Matte Black"},{"i":"wc3217","n":"Shower Doors - Custom Size Door, Brushed Nickel","p":4450.0,"c":"Bathroom","s":"Shower Doors","sup":"ETNA","f1l":"Size","f1v":"Custom Size Door","f2l":"Color","f2v":"Brushed Nickel"},{"i":"wc3219","n":"Shower Doors - Custom Size Door, Champagne","p":4450.0,"c":"Bathroom","s":"Shower Doors","sup":"ETNA","f1l":"Size","f1v":"Custom Size Door","f2l":"Color","f2v":"Champagne"},{"i":"wc3037","n":"Shower Doors - Custom Size Door, Chrome","p":4450.0,"c":"Bathroom","s":"Shower Doors","sup":"ETNA","f1l":"Size","f1v":"Custom Size Door","f2l":"Color","f2v":"Chrome"},{"i":"K-706000-L-SH","n":"Bathtub Doors - Chrome - Chrome","p":3000.0,"c":"Bathroom","s":"Bathtub Doors","d":"CHROME Levity' 62\" H sliding bath door with 1/4\"-thick glass","sup":"ETNA","f1l":"Color","f1v":"Chrome"},{"i":"K-706000-L-BL","n":"Bathtub Doors - Matte Black - Matte Black","p":3000.0,"c":"Bathroom","s":"Bathtub Doors","d":"MATTE BLACK Levity  62\" H sliding bath door with 1/4\"-thick glass","sup":"ETNA","f1l":"Color","f1v":"Matte Black"},{"i":"K-706000-L-MX","n":"Bathtub Doors - Brushed Nickel - Brushed Nickel","p":3000.0,"c":"Bathroom","s":"Bathtub Doors","d":"BRUSHED NICKEL Levity' 62\" H sliding bath door with 1/4\"-thick glass","sup":"ETNA","f1l":"Color","f1v":"Brushed Nickel"},{"i":"K-706000-L-2MB","n":"Bathtub Doors - Champagne - Champagne","p":3000.0,"c":"Bathroom","s":"Bathtub Doors","d":"CHAMPAGNE BRONZE Levity' 62\" H sliding bath door with 1/4\"-thick glass","sup":"ETNA","f1l":"Color","f1v":"Champagne"},{"i":"SMSTH1414-MB","n":"Nowstone Niche - 14x14, Matte Black - 14x14, Matte Black","p":494.44,"c":"Bathroom","s":"Nowstone Niche","d":"SMSTH1414-MB - NICHE Matte Black","sup":"DSI","f1l":"Size","f1v":"14x14","f2l":"Color","f2v":"Matte Black"},{"i":"SMSTH1414-CB","n":"Nowstone Niche - 14x14, Champagne Bronze - 14x14, Champagne Bronze","p":494.44,"c":"Bathroom","s":"Nowstone Niche","d":"SMSTH1414-CB - NICHE Champagne Bronze","sup":"DSI","f1l":"Size","f1v":"14x14","f2l":"Color","f2v":"Champagne Bronze"},{"i":"SMSTH1414-WH","n":"Nowstone Niche - 14x14, White - 14x14, White","p":494.44,"c":"Bathroom","s":"Nowstone Niche","d":"SMSTH1414-WH - NICHE White","sup":"DSI","f1l":"Size","f1v":"14x14","f2l":"Color","f2v":"White"},{"i":"wc6717","n":"Nowstone Niche - 14x14, Brushed Stainless - 14x14, Brushed Stainless","p":308.98,"c":"Bathroom","s":"Nowstone Niche","sup":"DSI","f1l":"Size","f1v":"14x14","f2l":"Color","f2v":"Brushed Stainless"},{"i":"SMSTV3414-BS","n":"Nowstone Niche - 14x34, Brushed Stainless","p":200.0,"c":"Bathroom","s":"Nowstone Niche","d":"Vertical 3414 NICHE Brushed Stainless includes tempered glass shelves","sup":"DSI","f1l":"Size","f1v":"14x34","f2l":"Color","f2v":"Brushed Stainless"},{"i":"SMSTV3414-WH","n":"Nowstone Niche - 14x34, White","p":399.0,"c":"Bathroom","s":"Nowstone Niche","d":"Vertical 3414 NICHE White includes tempered glass shelves","sup":"DSI","f1l":"Size","f1v":"14x34","f2l":"Color","f2v":"White"},{"i":"SMSTV3414-GR","n":"Nowstone Niche - 14x34, Gray","p":366.66,"c":"Bathroom","s":"Nowstone Niche","d":"Vertical 3414 NICHE Grey includes tempered glass shelves","sup":"DSI","f1l":"Size","f1v":"14x34","f2l":"Color","f2v":"Gray"},{"i":"SMSTV3414-MB","n":"Nowstone Niche - 14x34, Matte Black","p":366.22,"c":"Bathroom","s":"Nowstone Niche","d":"Vertical 3414 NICHE Matte Black includes tempered glass shelves","sup":"DSI","f1l":"Size","f1v":"14x34","f2l":"Color","f2v":"Matte Black"},{"i":"wc5329","n":"Toilets - Skirted - Skirted","p":249.45,"c":"Bathroom","s":"Toilets","d":"American Standard Aspirations White Elongated Chair height 12-in Rough-In WaterSense 1.28 GPF Soft Close 2-piece Toilet - Item #6267560 |Model #785AA801.020","sup":"LOW","f1l":"Type","f1v":"Skirted"},{"i":"wc6581","n":"Toilets - SMART Toilet - SMART Toilet","p":5121.66,"c":"Bathroom","s":"Toilets","d":"Smart Toilet with Bidet Built in by Onirap, Tank Built in with Powerful Flush, Elongated Heated &amp; Wider Seat, Auto Open/Close Lid, Warm Water Sprayer &amp; Dryer, Night Light, ADA Height for Bathroom","sup":"LOW","f1l":"Type","f1v":"SMART Toilet"},{"i":"wc3363","n":"Toilets - Standard Elongated - Standard Elongated","p":250.0,"c":"Bathroom","s":"Toilets","d":"Mansfield Right Height Elongated-Front Toilet from American Standard is a high-efficiency, ultra-low consumption toilet that uses 20% less water than conventional toilets without sacrificing performance. Standard Height","sup":"LOW","f1l":"Type","f1v":"Standard Elongated"},{"i":"wc1539","n":"Toilets - Chair Height Round - Chair Height Round","p":250.0,"c":"Bathroom","s":"Toilets","d":"Mansfield Two-Piece 1.28 GPF Single Flush Round Chair Height Toilet with Slow-Close Seat 16.5 chair height","sup":"LOW","f1l":"Type","f1v":"Chair Height Round"},{"i":"1005138797","n":"Toilets - Chair Height Elongated - Chair Height Elongated","p":250.0,"c":"Bathroom","s":"Toilets","d":"Mansfield Two-Piece 1.28 GPF Single Flush Elongated Chair Height Toilet with Slow-Close Seat 16.5 chair height","sup":"LOW","f1l":"Type","f1v":"Chair Height Elongated"},{"i":"1001479172","n":"Toilets - Standard Round - Standard Round","p":250.0,"c":"Bathroom","s":"Toilets","d":"Mansfield Right Height Round-Front Toilet from American Standard is a high-efficiency, ultra-low consumption toilet that uses 20% less water than conventional toilets without sacrificing performance. Standard Height","sup":"LOW","f1l":"Type","f1v":"Standard Round"},{"i":"DELTA 144749","n":"Bathtub Diverter Trim Kits - Nicoli Fixed Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749 CHROME DELTA NICOLI: MONITOR 14 SERIES H2OKINETIC TUB AND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 144749-BL","n":"Bathtub Diverter Trim Kits - Nicoli Fixed Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-BL MATTE BLACK DELTA NICOLI: MONITOR 14 SERIES H2OKINETIC TUB AND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Matte Black Delta -..."},{"i":"DELTA 144749-SS","n":"Bathtub Diverter Trim Kits - Nicoli Fixed Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-SS STAINLESS DELTA NICOLI: MONITOR 14 SERIES H2OKINETIC TUB AND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 144749-CZ","n":"Bathtub Diverter Trim Kits - Nicoli Fixed Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-CZ CHAMPAGNE BRONZE MONITOR 14 SERIES TUB AND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Champagne Delta"},{"i":"DELTA 144749-HS","n":"Bathtub Diverter Trim Kits - Nicoli Removable Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-HS CHROME DELTA NICOLI: MONITOR 14 SERIES TUB AND SHOWER WITH SUREDOCK HAND SHOWER SINGLE HANDLE LEVER  Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 144749-BL-HS","n":"Bathtub Diverter Trim Kits - Nicoli Removable Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-BL-HS MATTE BLACK DELTA NICOLI: MONITOR 14 SERIES TUB AND SHOWER WITH SUREDOCK HAND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Matte Black Del..."},{"i":"DELTA 144749-SS-HS","n":"Bathtub Diverter Trim Kits - Nicoli Removable Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-SS-HS STAINLESS DELTA NICOLI: MONITOR 14 SERIES TUB AND SHOWER WITH SUREDOCK HAND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Stainless Delta..."},{"i":"DELTA 144749-CZ-HS","n":"Bathtub Diverter Trim Kits - Nicoli Removable Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA 144749-CZ-HS CHAMPAGNE BRONZE DELTA NICOLI: MONITOR 14 SERIES TUB AND SHOWER WITH SUREDOCK HAND SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Champagne Delta..."},{"i":"DELTA T14437","n":"Bathtub Diverter Trim Kits - Velum Fixed Head, Chrome Delta","p":124.8,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA T14437 CHROME DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA T14437-BL","n":"Bathtub Diverter Trim Kits - Velum Fixed Head, Matte Black Delta","p":177.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA T14437-BL MATTE BLACK DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER SINGLE HANDLE LEVER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA T14437-SS","n":"Bathtub Diverter Trim Kits - Velum Fixed Head, Stainless Delta","p":168.6,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA T14437-SS STAINLESS STEEL VELUM TUB/SHOWER TRIM ONLY. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA T14437-CZ","n":"Bathtub Diverter Trim Kits - Velum Fixed Head, Champagne Delta","p":193.2,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA T14437-CZ DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER SINGLE HANDLE LEVER CHAMPAGNE BRONZE. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc982","n":"Bathtub Diverter Trim Kits - Velum Removable Head, Chrome Delta","p":104.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA CHROME DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER  DELTA T14437-LHD CHROME DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER  DELTA 58474-PR25 IN2ITION H20 HSSH 2.5 GPM MAGNATITE 5S Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc983","n":"Bathtub Diverter Trim Kits - Velum Removable Head, Matte Black Delta","p":239.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA  MATTE BLACK DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER DELTA T14437-BLLHD MATTE BLACK DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER. DELTA 58474-BL25 MATTE BLACK DELTA UNIVERSAL SHOWERING COMPONENTS: H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWER. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Matte Black Delt..."},{"i":"wc984","n":"Bathtub Diverter Trim Kits - Velum Removable Head, Stainless Delta","p":211.88,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA T14437-SSLHD STAINLESS DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER  DELTA 58474-SS-PR25 STAINLESS DELTA UNIVERSAL SHOWERING COMPONENTS: H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWER Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Stainless Delta ..."},{"i":"wc985","n":"Bathtub Diverter Trim Kits - Velum Removable Head, Champagne Delta","p":340.26,"c":"Bathroom","s":"Bathtub Trim Kits","d":"DELTA CHAMPAGNE BRONZE DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER  DELTA T14437-CZLHD CHAMPAGNE BRONZE DELTA VELUM: MONITOR 14 SERIES TUB &amp; SHOWER - LESS HD SINGLE HANDLE LEVER. DELTA 58474-CZ-PR25 H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWERHD IN LUMICO. Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Champagne Delta ..."},{"i":"wc5311","n":"Bathtub Diverter Trim Kits - Modern Rainfall, Champagne Delta","p":287.64,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Faucet Modern Raincan Round Single-Function Tub and Shower Trim Kit Gold, Tub Faucet Set, Rainfall Shower Head Gold, Delta Shower Kit, Champagne Bronze T14469-CZ-PP (Valve Not Included)  Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc5312","n":"Bathtub Diverter Trim Kits - Modern Rainfall, Stainless Delta","p":287.64,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Faucet Modern Raincan Round Single-Function Tub and Shower Trim Kit Brushed Nickel, Tub Faucet Set, Rainfall Shower Head, Spotshield Stainless T14469-SP-PP (Valve Not Included) Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc5313","n":"Bathtub Diverter Trim Kits - Modern Rainfall, Matte Black Delta","p":287.64,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Faucet Modern Raincan Round Single-Function Tub and Shower Trim Kit Black, Tub Faucet Set, Rainfall Shower Head Black, Delta Shower Trim Kit, Matte Black T14469-BL-PP (Valve Not Included) Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc5314","n":"Bathtub Diverter Trim Kits - Modern Rainfall, Chrome Delta","p":287.64,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Modern 14 Series Round Rain Bathtub and Shower Faucet Set, Rainfall Chrome Shower Head and Handle Set, Valve Trim Kit, 10 Inch, Chrome T14469-PP (Valve Not Included) Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"144840-CZ-I","n":"Bathtub Diverter Trim Kits - Arvo Removable Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Arvo 14 Series Brushed Gold Bathtub Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with Handheld Spray Combo, Valve Trim Kit, Champagne Bronze 144840-CZ-I (Valve Included)  - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Champagne Delta -..."},{"i":"144840-SP-I","n":"Bathtub Diverter Trim Kits - Arvo Removable Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Arvo 14 Series Brushed Nickel Bathtub Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with Handheld Spray Combo, Valve Trim Kit, Spotshield Stainless 144840-SP-I (Valve Included)  - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Stainless Delta -..."},{"i":"144840-BL-I","n":"Bathtub Diverter Trim Kits - Arvo Removable Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Arvo 14 Series Matte Black Bathtub Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with Handheld Spray Combo, Valve Trim Kit, Matte Black 144840-BL-I (Valve Included) - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Matte Black Delta..."},{"i":"144840-I","n":"Bathtub Diverter Trim Kits - Arvo Removable Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Delta Arvo 14 Series Chrome Bathtub Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with Handheld Spray Combo, Valve Trim Kit, Chrome 144840-I (Valve Included) - AMZ","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6551","n":"Bathtub Diverter Trim Kits - Modern Stationary, Stainless Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6552","n":"Bathtub Diverter Trim Kits - Modern Stationary, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Matte Black Delta -..."},{"i":"wc6553","n":"Bathtub Diverter Trim Kits - Modern Stationary, Chrome Delta","p":0.0,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6554","n":"Bathtub Diverter Trim Kits - Hydrorain, Champagne Delta","p":225.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Shower Head: 75419CZ Shower arm: U4993-CZ Shower trim handle:T14037-CZ Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc6555","n":"Bathtub Diverter Trim Kits - Hydrorain, Stainless Delta","p":101.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Shower head PN: 75419SN Shower arm: U4993-SS Shower trim handle: T14037-SS Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6556","n":"Bathtub Diverter Trim Kits - Hydrorain, Matte Black Delta","p":189.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Shower head Part Number: ?75419BL Shower Arm Flange: U4993-RB Velum Matte Black Trim Handle: T14037-BL Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6557","n":"Bathtub Diverter Trim Kits - Hydrorain, Chrome Delta","p":79.0,"c":"Bathroom","s":"Bathtub Trim Kits","d":"Shower head: 75419 Shower Arm: U4993-PK Shower trim Handle: T14037 Valve: GID-130014 R10000-UNBX Universal Shower Valve Body Replacement Delta Faucet R10000 UNBX Bathtub and Shower Valve Body for Tub Faucet Trim Kits, Fits Single or Dual Function Delta Faucet Trim Set","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6558","n":"Bathtub Diverter Trim Kits - Square Rainfall, Chrome Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6559","n":"Bathtub Diverter Trim Kits - Square Rainfall, Matte Black Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6560","n":"Bathtub Diverter Trim Kits - Square Rainfall, Stainless Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6561","n":"Bathtub Diverter Trim Kits - Square Rainfall, Champagne Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc6562","n":"Bathtub Diverter Trim Kits - Round Rainfall, Chrome Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6563","n":"Bathtub Diverter Trim Kits - Round Rainfall, Matte Black Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6564","n":"Bathtub Diverter Trim Kits - Round Rainfall, Stainless Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6565","n":"Bathtub Diverter Trim Kits - Round Rainfall, Champagne Delta","p":2951.88,"c":"Bathroom","s":"Bathtub Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc6535","n":"Shower Diverter Trim Kits - Hydrorain, Champagne Delta","p":225.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Shower Head: 75419CZ Shower arm: ?U4993-CZ Shower trim handle:T14037-CZ Valve: DELTA R10000-UNBXHF 3-PORT 76.60 40.82 MULTICHOICE SINGLE BOX HIGH FLOW VALVE BODY","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc6536","n":"Shower Diverter Trim Kits - Hydrorain, Stainless Delta","p":101.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Shower head PN: 75419SN Shower arm: ?U4993-SS Shower trim handle: T14037-SS Valve: DELTA R10000-UNBXHF 3-PORT 76.60 40.82 MULTICHOICE SINGLE BOX HIGH FLOW VALVE BODY","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6537","n":"Shower Diverter Trim Kits - Hydrorain, Matte Black Delta","p":189.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Shower head Part Number: ?75419BL Shower Arm Flange: ?U4993-RB Velum Matte Black Trim Handle: T14037-BL Valve: DELTA R10000-UNBXHF 3-PORT 76.60 40.82 MULTICHOICE SINGLE BOX HIGH FLOW VALVE BODY","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6538","n":"Shower Diverter Trim Kits - Hydrorain, Chrome Delta","p":79.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Shower head: 75419 Shower Arm: U4993-PK Shower trim Handle: ?T14037 Valve: DELTA R10000-UNBXHF 3-PORT 76.60 40.82 MULTICHOICE SINGLE BOX HIGH FLOW VALVE BODY","sup":"ETNA","f1l":"Style","f1v":"Hydrorain","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6540","n":"Shower Diverter Trim Kits - Modern Stationary, Stainless Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6541","n":"Shower Diverter Trim Kits - Modern Stationary, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6542","n":"Shower Diverter Trim Kits - Modern Stationary, Chrome Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Modern Stationary","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6543","n":"Shower Diverter Trim Kits - Square Rainfall, Chrome Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6544","n":"Shower Diverter Trim Kits - Square Rainfall, Matte Black Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6545","n":"Shower Diverter Trim Kits - Square Rainfall, Stainless Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6546","n":"Shower Diverter Trim Kits - Square Rainfall, Champagne Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Square Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc6547","n":"Shower Diverter Trim Kits - Round Rainfall, Chrome Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"wc6548","n":"Shower Diverter Trim Kits - Round Rainfall, Matte Black Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc6549","n":"Shower Diverter Trim Kits - Round Rainfall, Stainless Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc6550","n":"Shower Diverter Trim Kits - Round Rainfall, Champagne Delta","p":2951.88,"c":"Bathroom","s":"Shower Trim Kits","sup":"ETNA","f1l":"Style","f1v":"Round Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc5303","n":"Shower Diverter Trim Kits - Modern Rainfall, Champagne Delta","p":287.64,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Modern 14 Series Round Rain Shower Faucet Set, Brushed Gold Shower Head and Handle Set, Valve Trim Kit, Champagne Bronze T14269-CZ-PP (Valve Not Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Champagne Delta"},{"i":"wc5304","n":"Shower Diverter Trim Kits - Modern Rainfall, Stainless Delta","p":287.64,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Modern 14 Series Round Rain Shower Faucet Set, Brushed Nickel Shower Head and Handle Set, Valve Trim Kit, Spotshield Stainless T14269-SP-PP (Valve Not Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Stainless Delta"},{"i":"wc5305","n":"Shower Diverter Trim Kits - Modern Rainfall, Matte Black Delta","p":287.64,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Modern 14 Series Round Rain Shower Faucet Set, Matte Black Shower Head and Handle Set, Valve Trim Kit, Matte Black T14269-BL-PP (Valve Not Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Matte Black Delta"},{"i":"wc5306","n":"Shower Diverter Trim Kits - Modern Rainfall, Chrome Delta","p":287.64,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Modern 14 Series Round Rain Shower Faucet Set, Chrome Shower Head and Handle Set, Valve Trim Kit, Chrome T14269-PP (Valve Not Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Modern Rainfall","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 142749","n":"Shower Diverter Trim Kits - Nicoli Fixed Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA 142749 NICOLI MONITOR 14 SERIES H2OKINETIC SHOWER TRIM CHROME. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA 142749-BL","n":"Shower Diverter Trim Kits - Nicoli Fixed Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA 142749-BL MATTE BLACK DELTA NICOLI: MONITOR 14 SERIES H2OKINETIC SHOWER SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA 142749-SS","n":"Shower Diverter Trim Kits - Nicoli Fixed Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA 142749-SS STAINLESS DELTA NICOLI: MONITOR 14 SERIES H2OKINETIC SHOWER SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA 142749-CZ","n":"Shower Diverter Trim Kits - Nicoli Fixed Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA 142749-CZ CHAMPAGNE BRONZE DELTA NICOLI: MONITOR 14 SERIES SHOWER ONLY SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Fixed Head","f2l":"Color","f2v":"Champagne Delta"},{"i":"auto_showerdivertertrimki_58307","n":"Shower Diverter Trim Kits - Nicoli Removable Head, Chrome Delta","p":194.53,"c":"Bathroom","s":"Shower Trim Kits","d":"NICOLI CHROME 7-Setting SureDock Magnetic Hand Shower in Lumicoat Chrome  54910-PR-PK.  RP6025PR RP6023PR T14056-LHP--H566 RP101303 R10000-UNBXHF DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"auto_showerdivertertrimki_45477","n":"Shower Diverter Trim Kits - Nicoli Removable Head, Matte Black Delta","p":727.74,"c":"Bathroom","s":"Shower Trim Kits","d":"NICOLI MATTE BLACK 7-Setting SureDock Magnetic Hand Shower in Lumicoat MATTE BLACK. 54910-BL-PK RP6023BL RP6025BL T14056-BLLHP RP101303BL R10000-UNBXHF DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Matte Black Delt..."},{"i":"auto_showerdivertertrimki_52527","n":"Shower Diverter Trim Kits - Nicoli Removable Head, Stainless Delta","p":525.0,"c":"Bathroom","s":"Shower Trim Kits","d":"NICOLI STAINLESS 7-Setting SureDock Magnetic Hand Shower in Lumicoat STAINLESS. 54910-SS-PR-PK RP6023SSPR RP6025SSPR T14056-SSLHP RP101303SS R10000-UNBXHF DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Stainless Delta ..."},{"i":"auto_showerdivertertrimki_09204","n":"Shower Diverter Trim Kits - Nicoli Removable Head, Champagne Delta","p":727.74,"c":"Bathroom","s":"Shower Trim Kits","d":"NICOLI CHAMPAGNE BRONZE 7-Setting SureDock Magnetic Hand Shower in Lumicoat RP6025CZ RP6023CZPR 54910-CZ-PR-PK T14056-CZLHP RP101303CZ R10000-UNBXHF DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Nicoli Removable Head","f2l":"Color","f2v":"Champagne Delta ..."},{"i":"DELTA T14237","n":"Shower Diverter Trim Kits - Velum Fixed Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA T14237 VELUM: MONITOR 14 SERIES SHOWER TRIM SINGLE HANDLE LEVER CHROME  DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"DELTA T14237-BL","n":"Shower Diverter Trim Kits - Velum Fixed Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA T14237-BL MATTE BLACK DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Matte Black Delta"},{"i":"DELTA T14237-SS","n":"Shower Diverter Trim Kits - Velum Fixed Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA T14237-SS BRILLIANT STAINLESS DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Stainless Delta"},{"i":"DELTA T14237-CZ","n":"Shower Diverter Trim Kits - Velum Fixed Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"DELTA T14237-CZ CHAMP BRONZE DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM SINGLE HANDLE LEVER. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Fixed Head","f2l":"Color","f2v":"Champagne Delta"},{"i":"auto_showerdivertertrimki_64700","n":"Shower Diverter Trim Kits - Velum Removable Head, Chrome Delta","p":108.25,"c":"Bathroom","s":"Shower Trim Kits","d":"CHROME DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM DELTA T14237-LHD CHROME DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM. DELTA 58474-PR25 IN2ITION H20 HSSH 2.5 GPM MAGNATITE 5S. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"auto_showerdivertertrimki_98015","n":"Shower Diverter Trim Kits - Velum Removable Head, Matte Black Delta","p":451.07,"c":"Bathroom","s":"Shower Trim Kits","d":"MATTE BLACK DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM DELTA 58474-BL25 MATTE BLACK DELTA UNIVERSAL SHOWERING COMPONENTS: H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWER DELTA T14237-BLLHD MATTE BLACK DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Matte Black Delta..."},{"i":"auto_showerdivertertrimki_18693","n":"Shower Diverter Trim Kits - Velum Removable Head, Stainless Delta","p":396.08,"c":"Bathroom","s":"Shower Trim Kits","d":"STAINLESS DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM DELTA 58474-SS-PR25 STAINLESS DELTA UNIVERSAL SHOWERING COMPONENTS: H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWER. DELTA T14237-SSLHD STAINLESS DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Stainless Delta -..."},{"i":"auto_showerdivertertrimki_74731","n":"Shower Diverter Trim Kits - Velum Removable Head, Champagne Delta","p":751.5,"c":"Bathroom","s":"Shower Trim Kits","d":"CHAMPAGNE BRONZE DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM DELTA 58474-CZ-PR25 H2OKINETIC IN2ITION 5-SETTING TWO-IN-ONE SHOWERHD IN LUMICO. DELTA T14237-CZLHD CHAMPAGNE BRONZE DELTA VELUM: MONITOR 14 SERIES SHOWER TRIM. DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"ETNA","f1l":"Style","f1v":"Velum Removable Head","f2l":"Color","f2v":"Champagne Delta -..."},{"i":"142840-CZ-I","n":"Shower Diverter Trim Kits - Arvo Removable Head, Champagne Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Arvo 14 Series Brushed Gold Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with HandHeld Spray Combo, Valve Trim Kit, Champagne Bronze 142840-CZ-I (Valve Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Champagne Delta"},{"i":"142840-SP-I","n":"Shower Diverter Trim Kits - Arvo Removable Head, Stainless Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Arvo 14 Series Brushed Nickel Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with HandHeld Spray Combo, Valve Trim Kit, SpotShield Stainless 142840-SP-I (Valve Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Stainless Delta"},{"i":"142840-BL-I","n":"Shower Diverter Trim Kits - Arvo Removable Head, Matte Black Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Arvo 14 Series Matte Black Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with HandHeld Spray Combo, Valve Trim Kit, Matte Black 142840-BL-I (Valve Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Matte Black Delta ..."},{"i":"142840-I","n":"Shower Diverter Trim Kits - Arvo Removable Head, Chrome Delta","p":0.0,"c":"Bathroom","s":"Shower Trim Kits","d":"Delta Arvo 14 Series Chrome Shower Faucet Set with In2ition 2-in-1 Dual Shower Head with HandHeld Spray Combo, Valve Trim Kit, Chrome 142840-I (Valve Included) DELTA R10000-UNBXHF 3-PORT FLOW VALVE","sup":"AMZ","f1l":"Style","f1v":"Arvo Removable Head","f2l":"Color","f2v":"Chrome Delta"},{"i":"41812","n":"Grab Bars - Round, 12 Inch, Chrome","p":270.0,"c":"Bathroom","s":"Grab Bars","d":"Chrome 12\" Contemporary Decorative Ada Grab Bar Bathsafety 12\" Contemporary Decorative Ada Grab Bar - Chrome Delta: 41812","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41812-BL","n":"Grab Bars - Round, 12 Inch, Matte Black","p":336.49,"c":"Bathroom","s":"Grab Bars","d":"Matte Black Bathsafety 12\" Contemporary Decorative Ada Grab Bar Bathsafety 12\" Contemporary Decorative Ada Grab Bar - Matte Black Delta: 41812-BL","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41812-SS","n":"Grab Bars - Round, 12 Inch, Stainless","p":329.58,"c":"Bathroom","s":"Grab Bars","d":"Stainless 12\" Contemporary Decorative Ada Grab Bar Bathsafety 12\" Contemporary Decorative Ada Grab Bar - Stainless Delta: 41812-SS","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41812-CZ","n":"Grab Bars - Round, 12 Inch, Champagne","p":376.18,"c":"Bathroom","s":"Grab Bars","d":"Champagne Bronze Bathsafety 12\" Contemporary Decorative Ada Grab Bar Bathsafety 12\" Contemporary Decorative Ada Grab Bar - Champagne Bronze Delta: 41812-CZ","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Champagne"},{"i":"41818","n":"Grab Bars - Round, 18 Inch, Chrome","p":287.6,"c":"Bathroom","s":"Grab Bars","d":"Chrome Bathsafety 18\" Contemporary Decorative Ada Grab Bar Bathsafety 18\" Contemporary Decorative Ada Grab Bar - Chrome Delta: 41818","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41818-BL","n":"Grab Bars - Round, 18 Inch, Matte Black","p":353.74,"c":"Bathroom","s":"Grab Bars","d":"Matte Black Bathsafety 18\" Contemporary Decorative Ada Grab Bar Bathsafety 18\" Contemporary Decorative Ada Grab Bar - Matte Black Delta: 41818-BL","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41818-SS","n":"Grab Bars - Round, 18 Inch, Stainless","p":347.99,"c":"Bathroom","s":"Grab Bars","d":"Stainless 18\" Contemporary Decorative Ada Grab Bar Bathsafety 18\" Contemporary Decorative Ada Grab Bar - Stainless Delta: 41818-SS","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41818-CZ","n":"Grab Bars - Round, 18 Inch, Champagne","p":396.88,"c":"Bathroom","s":"Grab Bars","d":"Champagne Bronze Bathsafety 18\" Contemporary Decorative Ada Grab Bar Bathsafety 18\" Contemporary Decorative Ada Grab Bar - Champagne Bronze Delta: 41818-CZ","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Champagne"},{"i":"41824","n":"Grab Bars - Round, 24 Inch, Chrome","p":312.33,"c":"Bathroom","s":"Grab Bars","d":"Chrome Bathsafety 24\" Contemporary Decorative Ada Grab Bar Bathsafety 24\" Contemporary Decorative Ada Grab Bar - Chrome Delta: 41824","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41824-BL","n":"Grab Bars - Round, 24 Inch, Matte Black","p":386.53,"c":"Bathroom","s":"Grab Bars","d":"Matte Black  24\" Contemporary Decorative Ada Grab Bar Bathsafety 24\" Contemporary Decorative Ada Grab Bar - Matte Black Delta: 41824-BL","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41824-SS","n":"Grab Bars - Round, 24 Inch, Stainless","p":379.63,"c":"Bathroom","s":"Grab Bars","d":"Stainless 24\" Contemporary Decorative Ada Grab Bar - Stainless Bathsafety 24\" Contemporary Decorative Ada Grab Bar - Stainless Delta: 41824-SS","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41824-CZ","n":"Grab Bars - Round, 24 Inch, Champagne","p":388.26,"c":"Bathroom","s":"Grab Bars","d":"Champagne Bronze 24\" Contemporary Decorative Ada Grab Bar - Champagne Bronze Bathsafety 24\" Contemporary Decorative Ada Grab Bar - Champagne Bronze Delta: 41824-CZ","sup":"ETNA","f1l":"Style","f1v":"Round","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Champagne"},{"i":"41912","n":"Grab Bars - Square, 12 Inch, Chrome","p":271.33,"c":"Bathroom","s":"Grab Bars","d":"12\" Angular Modern Decorative Ada Grab Bar  (Chrome) 41912","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41912-BL","n":"Grab Bars - Square, 12 Inch, Matte Black","p":333.11,"c":"Bathroom","s":"Grab Bars","d":"12\" Angular Modern Decorative ADA Grab Bar (Matte Black) 41912-BL","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41912-SS","n":"Grab Bars - Square, 12 Inch, Stainless","p":356.66,"c":"Bathroom","s":"Grab Bars","d":"12\" Angular Modern Decorative ADA Grab Bar (Stainless) 41912-SS","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41912-CZ","n":"Grab Bars - Square, 12 Inch, Champagne","p":376.66,"c":"Bathroom","s":"Grab Bars","d":"12\" Angular Modern Decorative Ada Grab Bar (Champagne Bronze) 41912-CZ","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"12 Inch","f3l":"Color","f3v":"Champagne"},{"i":"41918","n":"Grab Bars - Square, 18 Inch, Chrome","p":287.88,"c":"Bathroom","s":"Grab Bars","d":"18\" Angular Modern Decorative Ada Grab Bar (Chrome) 41918","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41918-BL","n":"Grab Bars - Square, 18 Inch, Matte Black","p":367.77,"c":"Bathroom","s":"Grab Bars","d":"18\" Angular Modern Decorative ADA Grab Bar (Matte Black) 41918-BL","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41918-SS","n":"Grab Bars - Square, 18 Inch, Stainless","p":347.44,"c":"Bathroom","s":"Grab Bars","d":"18\" Angular Modern Decorative ADA Grab Bar (Stainless) 41918-SS.","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41918-CZ","n":"Grab Bars - Square, 18 Inch, Champagne","p":396.22,"c":"Bathroom","s":"Grab Bars","d":"18\" Angular Modern Decorative Ada Grab Bar (Champagne Bronze) 41918-CZ","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"18 Inch","f3l":"Color","f3v":"Champagne"},{"i":"41924","n":"Grab Bars - Square, 24 Inch, Chrome","p":353.33,"c":"Bathroom","s":"Grab Bars","d":"24\" Angular Modern Decorative Ada Grab Bar (Chrome) 41924","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Chrome"},{"i":"41924-BL","n":"Grab Bars - Square, 24 Inch, Matte Black","p":386.33,"c":"Bathroom","s":"Grab Bars","d":"24\" Angular Modern Decorative ADA Grab Bar (Matte Black) 41924-BL","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Matte Black"},{"i":"41924-SS.","n":"Grab Bars - Square, 24 Inch, Stainless","p":329.99,"c":"Bathroom","s":"Grab Bars","d":"24\" Angular Modern Decorative ADA Grab Bar (Stainless) 41924-SS","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Stainless"},{"i":"41924-CZ","n":"Grab Bars - Square, 24 Inch, Champagne","p":386.66,"c":"Bathroom","s":"Grab Bars","d":"24\" Angular Modern Decorative Ada Grab Bar (Champagne Bronze) 41924-CZ","sup":"ETNA","f1l":"Style","f1v":"Square","f2l":"Size","f2v":"24 Inch","f3l":"Color","f3v":"Champagne"},{"i":"wc1040","n":"Luxury Vinyl Tile - Mountains Gray","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - Gray-Dark WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Mountains Gray"},{"i":"wc1041","n":"Luxury Vinyl Tile - Carrara Avel","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System STYLE - Marble SHADE VARIATIONS - Low WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Carrara Avell"},{"i":"wc1042","n":"Luxury Vinyl Tile - Windsor Isle","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White LVT TYPE - Rigid Core THICKNESS - 5MM ZERO ACCLIMATION - Yes STYLE - Encaustic SHADE VARIATIONS - HIGH ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Windsor Isle"},{"i":"wc1043","n":"Luxury Vinyl Tile - Quarzo Taj","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System STYLE - Marble SHADE VARIATIONS - High WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Quarzo Taj"},{"i":"wc1044","n":"Luxury Vinyl Tile - Windsor Crest","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White LVT TYPE - Rigid Core THICKNESS - 5MM ZERO ACCLIMATION - Yes STYLE - Encaustic SHADE VARIATIONS - HIGH ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified","sup":"PLF","f1l":"Color","f1v":"Windsor Crest"},{"i":"wc1045","n":"Luxury Vinyl Tile - White Ocean","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White-Cool WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"White Ocean"},{"i":"wc1046","n":"Luxury Vinyl Tile - Calacatta Venosa Gold","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System STYLE - Marble SHADE VARIATIONS - High WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Calacatta Venosa Gold"},{"i":"wc1047","n":"Luxury Vinyl Tile - Calacatta Serra","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System STYLE - Marble SHADE VARIATIONS - High WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Calacatta Serra"},{"i":"wc1048","n":"Luxury Vinyl Tile - Calacatta Marbello","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White-Cool WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Calacatta Marbello"},{"i":"wc1049","n":"Luxury Vinyl Tile - Calacatta Legend","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","d":"SERIES NAME(S) - Trecento PRIMARY COLOR(S) - White WITH ENHANCED BEVELED EDGES - No LVT TYPE - Rigid Core THICKNESS - 5MM WITH ACOUSTIC PAD - Yes ZERO ACCLIMATION - Yes BACKINGTYPE - 1MM IXPE CLICK TYPE - Patented Locking System STYLE - Marble SHADE VARIATIONS - High WEAR LAYER - 12MIL ENVIRONMENTAL - NSF Certified, Greenguard Gold, FloorScore, USGBC LEED Certified WARRANTY - Limited Residential Lifetime; 10 Year Light Commercial","sup":"PLF","f1l":"Color","f1v":"Calacatta Legend"},{"i":"wc1050","n":"Luxury Vinyl Tile - Customer Select","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Customer Select"},{"i":"wc1053","n":"Luxury Vinyl Flooring - LP01 - LP01","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP01"},{"i":"wc1054","n":"Luxury Vinyl Flooring - LP02 - LP02","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP02"},{"i":"wc1055","n":"Luxury Vinyl Flooring - LP03 - LP03","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP03"},{"i":"wc1056","n":"Luxury Vinyl Flooring - LP04 - LP04","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP04"},{"i":"wc1057","n":"Luxury Vinyl Flooring - LP05 - LP05","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP05"},{"i":"wc1058","n":"Luxury Vinyl Flooring - LP06 - LP06","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP06"},{"i":"wc1059","n":"Luxury Vinyl Flooring - LP07 - LP07","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP07"},{"i":"wc1060","n":"Luxury Vinyl Flooring - LP08 - LP08","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP08"},{"i":"wc1061","n":"Luxury Vinyl Flooring - LP09 - LP09","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP09"},{"i":"wc1062","n":"Luxury Vinyl Flooring - LP010 - LP010","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP010"},{"i":"wc1063","n":"Luxury Vinyl Flooring - LP011 - LP011","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP011"},{"i":"wc1064","n":"Luxury Vinyl Flooring - LP012 - LP012","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP012"},{"i":"wc1065","n":"Luxury Vinyl Flooring - LP013 - LP013","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP013"},{"i":"wc1066","n":"Luxury Vinyl Flooring - LP014 - LP014","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP014"},{"i":"wc1067","n":"Luxury Vinyl Flooring - LP015 - LP015","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP015"},{"i":"wc1068","n":"Luxury Vinyl Flooring - LP016 - LP016","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP016"},{"i":"wc1069","n":"Luxury Vinyl Flooring - LP17 - LP17","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"LP17"},{"i":"wc6722","n":"Luxury Vinyl Flooring - Wright - Wright","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Wright"},{"i":"wc6723","n":"Luxury Vinyl Flooring - Sanibel - Sanibel","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Sanibel"},{"i":"wc6724","n":"Luxury Vinyl Flooring - Fresno - Fresno","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Fresno"},{"i":"wc6725","n":"Luxury Vinyl Flooring - Yakima - Yakima","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Yakima"},{"i":"wc6726","n":"Luxury Vinyl Flooring - Santa Fe - Santa Fe","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Santa Fe"},{"i":"wc6727","n":"Luxury Vinyl Flooring - Helena - Helena","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Helena"},{"i":"auto_luxuryvinylflooringc_22140","n":"Luxury Vinyl Flooring - Customer Select","p":0.0,"c":"Bathroom","s":"Bathroom Flooring","sup":"PLF","f1l":"Color","f1v":"Customer Select"},{"i":"wc5720","n":"Wall Mounted Foot Rest - Chrome - Chrome","p":312.33,"c":"Bathroom","s":"Wall Mount Foot Rests","sup":"ETNA","f1l":"Color","f1v":"Chrome"},{"i":"wc5721","n":"Wall Mounted Foot Rest - Matte Black - Matte Black","p":386.53,"c":"Bathroom","s":"Wall Mount Foot Rests","sup":"ETNA","f1l":"Color","f1v":"Matte Black"},{"i":"wc5722","n":"Wall Mounted Foot Rest - Stainless - Stainless","p":379.63,"c":"Bathroom","s":"Wall Mount Foot Rests","sup":"ETNA","f1l":"Color","f1v":"Stainless"},{"i":"wc5723","n":"Wall Mounted Foot Rest - Champagne - Champagne","p":388.26,"c":"Bathroom","s":"Wall Mount Foot Rests","sup":"ETNA","f1l":"Color","f1v":"Champagne"},{"i":"SMMWK363696-21","n":"Monterey Subway Pattern - White, 36x36 - White, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-21","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-27","n":"Monterey Subway Pattern - Gray Stone, 36x36 - Gray Stone, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-27","sup":"DSI","f1l":"Color","f1v":"Gray Stone","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-28","n":"Monterey Subway Pattern - Butternut, 36x36 - Butternut, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-28","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-47","n":"Monterey Subway Pattern - Carrara, 36x36 - Carrara, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-47","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-48","n":"Monterey Subway Pattern - Butterscotch, 36x36 - Butterscotch, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-48","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-49","n":"Monterey Subway Pattern - Creme, 36x36 - Creme, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-49","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-50","n":"Monterey Subway Pattern - Moonstone, 36x36 - Moonstone, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-50","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"36x36"},{"i":"SMMWK483696-21","n":"Monterey Subway Pattern - White, 48x36 - White, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-21","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-27","n":"Monterey Subway Pattern - Gray Stone, 48x36 - Gray Stone, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-27","sup":"DSI","f1l":"Color","f1v":"Gray Stone","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-28","n":"Monterey Subway Pattern - Butternut, 48x36 - Butternut, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-28","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-47","n":"Monterey Subway Pattern - Carrara, 48x36 - Carrara, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-47","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-48","n":"Monterey Subway Pattern - Butterscotch, 48x36 - Butterscotch, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-48","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-49","n":"Monterey Subway Pattern - Creme, 48x36 - Creme, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-49","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-50","n":"Monterey Subway Pattern - Moonstone, 48x36 - Moonstone, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-50","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"48x36"},{"i":"SMMWK603696-21","n":"Monterey Subway Pattern - White, 60x36 - White, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-21","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-27","n":"Monterey Subway Pattern - Gray Stone, 60x36 - Gray Stone, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-27","sup":"DSI","f1l":"Color","f1v":"Gray Stone","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-28","n":"Monterey Subway Pattern - Butternut, 60x36 - Butternut, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-28","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-47","n":"Monterey Subway Pattern - Carrara, 60x36 - Carrara, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-47","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-48","n":"Monterey Subway Pattern - Butterscotch, 60x36 - Butterscotch, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-48","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-49","n":"Monterey Subway Pattern - Creme, 60x36 - Creme, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-49","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-50","n":"Monterey Subway Pattern - Moonstone, 60x36 - Moonstone, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-50","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x36"},{"i":"SMMWK604896-21","n":"Monterey Subway Pattern - White, 60x48 - White, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-21","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-27","n":"Monterey Subway Pattern - Gray Stone, 60x48 - Gray Stone, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-27","sup":"DSI","f1l":"Color","f1v":"Gray Stone","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-28","n":"Monterey Subway Pattern - Butternut, 60x48 - Butternut, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-28","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-47","n":"Monterey Subway Pattern - Carrara, 60x48 - Carrara, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-47","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-48","n":"Monterey Subway Pattern - Butterscotch, 60x48 - Butterscotch, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-48","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-49","n":"Monterey Subway Pattern - Creme, 60x48 - Creme, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-49","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-50","n":"Monterey Subway Pattern - Moonstone, 60x48 - Moonstone, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-50","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x48"},{"i":"SMMWK606096-21","n":"Monterey Subway Pattern - White, 60x60 - White, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-21","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-27","n":"Monterey Subway Pattern - Gray Stone, 60x60 - Gray Stone, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-27","sup":"DSI","f1l":"Color","f1v":"Gray Stone","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-28","n":"Monterey Subway Pattern - Butternut, 60x60 - Butternut, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-28","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-47","n":"Monterey Subway Pattern - Carrara, 60x60 - Carrara, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-47","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-48","n":"Monterey Subway Pattern - Butterscotch, 60x60 - Butterscotch, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-48","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-49","n":"Monterey Subway Pattern - Creme, 60x60 - Creme, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-49","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-50","n":"Monterey Subway Pattern - Moonstone, 60x60 - Moonstone, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-50","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x60"},{"i":"SMMWK363696-21v","n":"Monterey Velvet Smooth Finish - White, 36x36 - White, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-21v","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-27v","n":"Monterey Velvet Smooth Finish - Greystone, 36x36 - Greystone, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-27v","sup":"DSI","f1l":"Color","f1v":"Greystone","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-28V","n":"Monterey Velvet Smooth Finish - Butternut, 36x36 - Butternut, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-28V","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-47v","n":"Monterey Velvet Smooth Finish - Carrara, 36x36 - Carrara, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-47v","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-48v","n":"Monterey Velvet Smooth Finish - Butterscotch, 36x36 - Butterscotch,...","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-48v","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-49v","n":"Monterey Velvet Smooth Finish - Creme, 36x36 - Creme, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-49v","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"36x36"},{"i":"SMMWK363696-50v","n":"Monterey Velvet Smooth Finish - Moonstone, 36x36 - Moonstone, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK363696-50v","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"36x36"},{"i":"SMMWK483696-21v","n":"Monterey Velvet Smooth Finish - White, 48x36 - White, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-21v","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-27v","n":"Monterey Velvet Smooth Finish - Greystone, 48x36 - Greystone, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-27v","sup":"DSI","f1l":"Color","f1v":"Greystone","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-28V","n":"Monterey Velvet Smooth Finish - Butternut, 48x36 - Butternut, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-28V","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-47v","n":"Monterey Velvet Smooth Finish - Carrara, 48x36 - Carrara, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-47v","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-48v","n":"Monterey Velvet Smooth Finish - Butterscotch, 48x36 - Butterscotch,...","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-48v","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-49v","n":"Monterey Velvet Smooth Finish - Creme, 48x36 - Creme, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-49v","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"48x36"},{"i":"SMMWK483696-50v","n":"Monterey Velvet Smooth Finish - Moonstone, 48x36 - Moonstone, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK483696-50v","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"48x36"},{"i":"SMMWK603696-21v","n":"Monterey Velvet Smooth Finish - White, 60x36 - White, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-21v","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-27v","n":"Monterey Velvet Smooth Finish - Greystone, 60x36 - Greystone, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-27v","sup":"DSI","f1l":"Color","f1v":"Greystone","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-28V","n":"Monterey Velvet Smooth Finish - Butternut, 60x36 - Butternut, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-28V","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-47v","n":"Monterey Velvet Smooth Finish - Carrara, 60x36 - Carrara, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-47v","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-48v","n":"Monterey Velvet Smooth Finish - Butterscotch, 60x36 - Butterscotch,...","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-48v","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-49v","n":"Monterey Velvet Smooth Finish - Creme, 60x36 - Creme, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-49v","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x36"},{"i":"SMMWK603696-50v","n":"Monterey Velvet Smooth Finish - Moonstone, 60x36 - Moonstone, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK603696-50v","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x36"},{"i":"SMMWK604896-21v","n":"Monterey Velvet Smooth Finish - White, 60x48 - White, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-21v","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-27v","n":"Monterey Velvet Smooth Finish - Greystone, 60x48 - Greystone, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-27v","sup":"DSI","f1l":"Color","f1v":"Greystone","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-28V","n":"Monterey Velvet Smooth Finish - Butternut, 60x48 - Butternut, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-28V","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-47v","n":"Monterey Velvet Smooth Finish - Carrara, 60x48 - Carrara, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-47v","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-48v","n":"Monterey Velvet Smooth Finish - Butterscotch, 60x48 - Butterscotch,...","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-48v","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-49v","n":"Monterey Velvet Smooth Finish - Creme, 60x48 - Creme, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-49v","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x48"},{"i":"SMMWK604896-50v","n":"Monterey Velvet Smooth Finish - Moonstone, 60x48 - Moonstone, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK604896-50v","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x48"},{"i":"SMMWK606096-21v","n":"Monterey Velvet Smooth Finish - White, 60x60 - White, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-21v","sup":"DSI","f1l":"Color","f1v":"White","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-27v","n":"Monterey Velvet Smooth Finish - Greystone, 60x60 - Greystone, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-27v","sup":"DSI","f1l":"Color","f1v":"Greystone","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-28V","n":"Monterey Velvet Smooth Finish - Butternut, 60x60 - Butternut, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-28V","sup":"DSI","f1l":"Color","f1v":"Butternut","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-47v","n":"Monterey Velvet Smooth Finish - Carrara, 60x60 - Carrara, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-47v","sup":"DSI","f1l":"Color","f1v":"Carrara","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-48v","n":"Monterey Velvet Smooth Finish - Butterscotch, 60x60 - Butterscotch,...","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-48v","sup":"DSI","f1l":"Color","f1v":"Butterscotch","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-49v","n":"Monterey Velvet Smooth Finish - Creme, 60x60 - Creme, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-49v","sup":"DSI","f1l":"Color","f1v":"Creme","f2l":"Size","f2v":"60x60"},{"i":"SMMWK606096-50v","n":"Monterey Velvet Smooth Finish - Moonstone, 60x60 - Moonstone, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMMWK606096-50v","sup":"DSI","f1l":"Color","f1v":"Moonstone","f2l":"Size","f2v":"60x60"},{"i":"SMLWK363696-181 add SMFIM962-181","n":"Luxura Nowstone - Misty River, 36x36 - Misty River, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK363696-181 add SMFIM962-181","sup":"DSI","f1l":"Color","f1v":"Misty River","f2l":"Size","f2v":"36x36"},{"i":"SMLWK483696-181 add SMFIM962-181","n":"Luxura Nowstone - Misty River, 48x36 - Misty River, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK483696-181 add SMFIM962-181","sup":"DSI","f1l":"Color","f1v":"Misty River","f2l":"Size","f2v":"48x36"},{"i":"SMLWK603696-181 add SMFIM962-181","n":"Luxura Nowstone - Misty River, 60x36 - Misty River, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK603696-181 add SMFIM962-181","sup":"DSI","f1l":"Color","f1v":"Misty River","f2l":"Size","f2v":"60x36"},{"i":"SMLWK604896-181 add SMFIM962-181","n":"Luxura Nowstone - Misty River, 60x48 - Misty River, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK604896-181 add SMFIM962-181","sup":"DSI","f1l":"Color","f1v":"Misty River","f2l":"Size","f2v":"60x48"},{"i":"SMLWK606096-181 add SMFIM962-181","n":"Luxura Nowstone - Misty River, 60x60 - Misty River, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK606096-181 add SMFIM962-181","sup":"DSI","f1l":"Color","f1v":"Misty River","f2l":"Size","f2v":"60x60"},{"i":"SMLWK363696-186 ADD SMFIM962-186","n":"Luxura Nowstone - Iceberg Gray, 36x36 - Iceberg Gray, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK363696-186 ADD SMFIM962-186","sup":"DSI","f1l":"Color","f1v":"Iceberg Gray","f2l":"Size","f2v":"36x36"},{"i":"SMLWK483696-186 ADD SMFIM962-186","n":"Luxura Nowstone - Iceberg Gray, 48x36 - Iceberg Gray, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK483696-186 ADD SMFIM962-186","sup":"DSI","f1l":"Color","f1v":"Iceberg Gray","f2l":"Size","f2v":"48x36"},{"i":"SMLWK603696-186 ADD SMFIM962-186","n":"Luxura Nowstone - Iceberg Gray, 60x36 - Iceberg Gray, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK603696-186 ADD SMFIM962-186","sup":"DSI","f1l":"Color","f1v":"Iceberg Gray","f2l":"Size","f2v":"60x36"},{"i":"SMLWK604896-186 ADD SMFIM962-186","n":"Luxura Nowstone - Iceberg Gray, 60x48 - Iceberg Gray, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK604896-186 ADD SMFIM962-186","sup":"DSI","f1l":"Color","f1v":"Iceberg Gray","f2l":"Size","f2v":"60x48"},{"i":"SMLWK606096-186 ADD SMFIM962-186","n":"Luxura Nowstone - Iceberg Gray, 60x60 - Iceberg Gray, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK606096-186 ADD SMFIM962-186","sup":"DSI","f1l":"Color","f1v":"Iceberg Gray","f2l":"Size","f2v":"60x60"},{"i":"SMLWK363696-190 ADD SMFIM962-190","n":"Luxura Nowstone - Bellagio, 36x36 - Bellagio, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK363696-190 ADD SMFIM962-190","sup":"DSI","f1l":"Color","f1v":"Bellagio","f2l":"Size","f2v":"36x36"},{"i":"SMLWK483696-190 ADD SMFIM962-190","n":"Luxura Nowstone - Bellagio, 48x36 - Bellagio, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK483696-190 ADD SMFIM962-190","sup":"DSI","f1l":"Color","f1v":"Bellagio","f2l":"Size","f2v":"48x36"},{"i":"SMLWK603696-190 ADD SMFIM962-190","n":"Luxura Nowstone - Bellagio, 60x36 - Bellagio, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK603696-190 ADD SMFIM962-190","sup":"DSI","f1l":"Color","f1v":"Bellagio","f2l":"Size","f2v":"60x36"},{"i":"SMLWK604896-190 ADD SMFIM962-190","n":"Luxura Nowstone - Bellagio, 60x48 - Bellagio, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK604896-190 ADD SMFIM962-190","sup":"DSI","f1l":"Color","f1v":"Bellagio","f2l":"Size","f2v":"60x48"},{"i":"SMLWK606096-190 ADD SMFIM962-190","n":"Luxura Nowstone - Bellagio, 60x60 - Bellagio, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK606096-190 ADD SMFIM962-190","sup":"DSI","f1l":"Color","f1v":"Bellagio","f2l":"Size","f2v":"60x60"},{"i":"SMLWK363696-185 ADD SMFIM962-185","n":"Luxura Nowstone - Creme Brulee, 36x36 - Creme Brulee, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK363696-185 ADD SMFIM962-185","sup":"DSI","f1l":"Color","f1v":"Creme Brulee","f2l":"Size","f2v":"36x36"},{"i":"SMLWK483696-185 ADD SMFIM962-185","n":"Luxura Nowstone - Creme Brulee, 48x36 - Creme Brulee, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK483696-185 ADD SMFIM962-185","sup":"DSI","f1l":"Color","f1v":"Creme Brulee","f2l":"Size","f2v":"48x36"},{"i":"SMLWK603696-185 ADD SMFIM962-185","n":"Luxura Nowstone - Creme Brulee, 60x36 - Creme Brulee, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK603696-185 ADD SMFIM962-185","sup":"DSI","f1l":"Color","f1v":"Creme Brulee","f2l":"Size","f2v":"60x36"},{"i":"SMLWK604896-185 ADD SMFIM962-185","n":"Luxura Nowstone - Creme Brulee, 60x48 - Creme Brulee, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK604896-185 ADD SMFIM962-185","sup":"DSI","f1l":"Color","f1v":"Creme Brulee","f2l":"Size","f2v":"60x48"},{"i":"SMLWK606096-185 ADD SMFIM962-185","n":"Luxura Nowstone - Creme Brulee, 60x60 - Creme Brulee, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"SMLWK606096-185 ADD SMFIM962-185","sup":"DSI","f1l":"Color","f1v":"Creme Brulee","f2l":"Size","f2v":"60x60"},{"i":"wc5128","n":"Durasein - Essence, 36x36 - Essence, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Essence - DM5413-143698 - 36 X 98 DM5013-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Essence","f2l":"Size","f2v":"36x36"},{"i":"wc5129","n":"Durasein - Essence, 48x36 - Essence, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Essence - DM5413-143698 - 36 X 98 DM5413-146098 - 60 X 98 DM5013-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Essence","f2l":"Size","f2v":"48x36"},{"i":"wc5130","n":"Durasein - Essence, 60x36 - Essence, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Essence - DM5413-143698 - 36 X 98 DM5413-146098 - 60 X 98 DM5013-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Essence","f2l":"Size","f2v":"60x36"},{"i":"wc5131","n":"Durasein - Essence, 60x48 - Essence, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Essence - DM5413-146098 - 60 X 98 DM5013-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Essence","f2l":"Size","f2v":"60x48"},{"i":"wc5132","n":"Durasein - Essence, 60x60 - Essence, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Essence - DM5413-146098 - 60 X 98 DM5013-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Essence","f2l":"Size","f2v":"60x60"},{"i":"wc5133","n":"Durasein - Stratus, 36x36 - Stratus, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Stratus - DM5445-143698 - 36 X 98 DM5045-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Stratus","f2l":"Size","f2v":"36x36"},{"i":"wc5134","n":"Durasein - Stratus, 48x36 - Stratus, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Stratus - DM5445-143698 - 36 X 98 DM5445-146098 - 60 X 98 DM5045-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Stratus","f2l":"Size","f2v":"48x36"},{"i":"wc5135","n":"Durasein - Stratus, 60x36 - Stratus, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Stratus - DM5445-143698 - 36 X 98 DM5445-146098 - 60 X 98 DM5045-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Stratus","f2l":"Size","f2v":"60x36"},{"i":"wc5136","n":"Durasein - Stratus, 60x48 - Stratus, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Stratus - DM5445-146098 - 60 X 98 DM5045-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Stratus","f2l":"Size","f2v":"60x48"},{"i":"wc5137","n":"Durasein - Stratus, 60x60 - Stratus, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Stratus - DM5445-146098 - 60 X 98 DM5045-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Stratus","f2l":"Size","f2v":"60x60"},{"i":"wc5138","n":"Durasein - Maple Magic, 36x36 - Maple Magic, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Maple Magic - DM5402-143698 36 X 98 DM5002-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Maple Magic","f2l":"Size","f2v":"36x36"},{"i":"wc5139","n":"Durasein - Maple Magic, 48x36 - Maple Magic, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Maple Magic - DM5402-143698 36 X 98 DM5402-146098 - 60 X 98 DM5002-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Maple Magic","f2l":"Size","f2v":"48x36"},{"i":"wc5140","n":"Durasein - Maple Magic, 60x36 - Maple Magic, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Maple Magic - DM5402-143698 36 X 98 DM5402-146098 - 60 X 98 DM5002-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Maple Magic","f2l":"Size","f2v":"60x36"},{"i":"wc5141","n":"Durasein - Maple Magic, 60x48 - Maple Magic, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Maple Magic - DM5402-146098 - 60 X 98 DM5002-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Maple Magic","f2l":"Size","f2v":"60x48"},{"i":"wc5142","n":"Durasein - Maple Magic, 60x60 - Maple Magic, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Maple Magic - DM5402-146098 - 60 X 98 DM5002-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Maple Magic","f2l":"Size","f2v":"60x60"},{"i":"wc5143","n":"Durasein - Coastal, 36x36 - Coastal, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Coastal - DM5401-143698 - 36 X 98 DM5001-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Coastal","f2l":"Size","f2v":"36x36"},{"i":"wc5144","n":"Durasein - Coastal, 48x36 - Coastal, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Coastal - DM5401-143698 - 36 X 98 DM5401-1436098 - 60 X 98 DM5001-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Coastal","f2l":"Size","f2v":"48x36"},{"i":"wc5145","n":"Durasein - Coastal, 60x36 - Coastal, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Coastal - DM5401-143698 - 36 X 98 DM5401-1436098 - 60 X 98 DM5001-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Coastal","f2l":"Size","f2v":"60x36"},{"i":"wc5146","n":"Durasein - Coastal, 60x48 - Coastal, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Coastal - DM5401-1436098 - 60 X 98 DM5001-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Coastal","f2l":"Size","f2v":"60x48"},{"i":"wc5147","n":"Durasein - Coastal, 60x60 - Coastal, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Coastal - DM5401-1436098 - 60 X 98 DM5001-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Coastal","f2l":"Size","f2v":"60x60"},{"i":"wc5148","n":"Durasein - Sprouted, 60x60 - Sprouted, 60x60","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Sprouted - DM5427-1436098 - 60 X 98 DM5027-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Sprouted","f2l":"Size","f2v":"60x60"},{"i":"wc5149","n":"Durasein - Sprouted, 60x48 - Sprouted, 60x48","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Sprouted - DM5427-1436098 - 60 X 98 DM5027-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Sprouted","f2l":"Size","f2v":"60x48"},{"i":"wc5150","n":"Durasein - Sprouted, 60x36 - Sprouted, 60x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Sprouted - DM5427-143698 - 36 X 98 DM5427-1436098 - 60 X 98 DM5027-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Sprouted","f2l":"Size","f2v":"60x36"},{"i":"wc5151","n":"Durasein - Sprouted, 48x36 - Sprouted, 48x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Sprouted - DM5427-143698 - 36 X 98 DM5427-1436098 - 60 X 98 DM5027-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Sprouted","f2l":"Size","f2v":"48x36"},{"i":"wc5152","n":"Durasein - Sprouted, 36x36 - Sprouted, 36x36","p":0.0,"c":"Bathroom","s":"Shower Walls","d":"Durasein - Sprouted - DM5427-143698 - 36 X 98 DM5027-COVE 96\" Corner Trim","sup":"DSI","f1l":"Color","f1v":"Sprouted","f2l":"Size","f2v":"36x36"},{"i":"wc352","n":"REPLACE TOILET","p":1121.4,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Removing old toilet. Installing new toilet. (***DOES NOT INCLUDE A NEW SHUTOFF VALVE***) (***NEW TOILET FLANGE IS NOT INCLUDED IF BROKE***)"},{"i":"wc353","n":"REPLACE VANITY LIGHTS.","p":805.11,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Remove old vanity light. Install new vanity light. (***DOES NOT INCLUDE MOVING LIGHTS***) (***DOES NOT INCLUDED ANY ELECTRICAL WORK***)"},{"i":"wc354","n":"REPLACE MIRROR","p":690.09,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Remove old mirror. Install new mirror. (***DOES NOT INCLUDE PAINTIING BEHIND MIRROR***) (***DOES NOT INCLUDE AND DRYWALL WORK BEHIND MIRROR***)"},{"i":"wc355","n":"REPLACE VANITY FAUCETS","p":833.86,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Remove old faucet. Install new faucet. (***MUST USE SAME STYLE FAUCET 8 INCH OR 4 INCH SPREAD***)"},{"i":"wc356","n":"PAINT BATHROOM (sq ft)","p":89.96,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Prep bathroom for painting. Patch walls. Prime walls. Paint ceiling. Paint walls."},{"i":"wc357","n":"REPLACE VANITY","p":5331.92,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Remove old vanity. Install new vanity. Reinstall new faucet. Reinstall old drains. (***DOES NOT INCLUDE MOVING LIGHT IF THEY DONT LINE UP***) (***DOES NOT INCLUDE UPDATING PLUMBING OF ANY KIND***) (***DOES NOT INCLUDE DRYWALL REPAIR OR PAINTING BEHIND VANITY***)"},{"i":"wc358","n":"LVP OR LVT FLOORING","p":0,"c":"Bathroom Extras","s":"Shower Only Extras","d":"Install LVT or LVP flooring - price per sq ft of flooring Install acrylic base board (***DOES NOT INCLUDE REMOVAL OF TILE FLOOR***) (***DOES NOT INCLUDE RASING OF DOOR THRESHOLDS***)"},{"i":"wc359","n":"RAISING DOOR THRESHOLD USING EXISTING THRESHOLD","p":381.88,"c":"Bathroom Extras","s":"Shower Only Extras","d":"RAISE THRESHOLD SO LVT/LVP IS BLEOW THE THREASHOLD. **DOES NOT INCLUDE A NEW THRESHOLD**"},{"i":"wc360","n":"UNUSUAL SHAPE OR SIZE SHOWER PAN","p":625.43,"c":"Bathroom Extras","s":"Tile Extras","d":"Install schluter shower pan. Install 1 foot of go board. Install drain kit. Install tile. (***MOSAIC SHEET TILE ONLY***) (***14 DOLLARS A SQUARE FOOT FOR TILE BUDGET***) (***FLOOR AND DECOR TILE ONLY***) (***TILE INSTALLTION ON SHOWER FLOOR ONLY***)"},{"i":"wc361","n":"SUBSTITUE TILE SHOWER IN PLACE OF NOW STONE IN WET AREA ONLY","p":0,"c":"Bathroom Extras","s":"Tile Extras","d":"Removing NOWSTONE from package and installing tile on shower walls with go board. Pre made acrylic shower pan will be used. Pre made niche. (***12X24 INCH TILE ONLY OR OF AN EQUIVILANT SQUARE FOOT SIZE***) (***LARGER OR SMALLER WALL TILES WILL BE AN ADDED COST***) (***6 DOLLARS A SQUARE FOOT TILE BUDGET***) (***FLOOR AND DECOR TILE ONLY***) (***NO VERTICAL PATTERNS OR HERRINGBONE***)"},{"i":"wc362","n":"BATHROOM FLOOR TILE","p":0,"c":"Bathroom Extras","s":"Tile Extras","d":"Demo old tile. Resheet floor. Prep floor with Ditra uncoupling membrane. Install tile. Acrylic baseboard. (***12X24 OR EQUIVALANT SQUARE FOOT SIZE ONLY***) (***LARGER OR SMALLER TILES WILL BE AN ADDED COST***) (***TILE BUDGET IS 6 DOLLARS A SQUARE FOOT***) (***FLOOR AND DECOR TILE ONLY***)"},{"i":"wc363","n":"INSTALLING HEATED FLOORS FOR BATHROOMS ON FIRST FLOOR AND OPEN BASEMENT CEILING","p":172.02,"c":"Bathroom Extras","s":"Tile Extras","d":"Installing heated floor in the bathroom using DITR"},{"i":"wc364","n":"INSTALLING HEATED FLOORS FOR BATHROOMS ON SECOND FLOOR","p":208.43,"c":"Bathroom Extras","s":"Tile Extras","d":"Installing heated floor in the bathroom using DITR"},{"i":"wc365","n":"LARGE FORMAT TILE WAINSCOTTING","p":107.56,"c":"Bathroom Extras","s":"Tile Extras","d":"Installing tile wainscotting on walls. *12x24 inch tile only or equivalent size tile* *Tile must be picked out by the customer at Floor and Decor* *6 Dollar a Square Foot budget for tile, any overage in price will be an added cost* **TO BE CHOSEN (FLOOR AND DECOR)"},{"i":"wc366","n":"WALL DRYWALL REPLACEMENT","p":41.22,"c":"Bathroom Extras","s":"Demo Extras","d":"Demo bathroom walls.    Insulate exterior walls. ("},{"i":"wc367","n":"DEMO FLOOR TILE AND RAISE FLOOR","p":78.74,"c":"Bathroom Extras","s":"Demo Extras","d":"DEMO FLOOR TILE.  DEMO SUB FLOOR.  INSTALL SUB FLO"},{"i":"wc368","n":"CEILING DRYWALL REPLACEMENT","p":45.5,"c":"Bathroom Extras","s":"Demo Extras","d":"1. Demo ceiling.  2. Install new insulation if nee"},{"i":"wc369","n":"SOFFIT REMOVAL (Ceiling is staying)","p":2200.0,"c":"Bathroom Extras","s":"Demo Extras","d":"1. Demo soffit.  2. Hang drywall.  3. Finish mud a"},{"i":"wc370","n":"SOFFIT REMOVAL ( with ceiling demo)","p":1100.0,"c":"Bathroom Extras","s":"Demo Extras","d":"1. Demo soffit.  2. Drywall.  3. Mud and paint."},{"i":"wc371","n":"DEMOING A JAQUZZI TUB","p":3138.14,"c":"Bathroom Extras","s":"Demo Extras","d":"1. Demo bathtub.  2. Redrywall behind bathtub.  3. Finish and paint."},{"i":"wc372","n":"Repair Sub Floor (rotted out due to water damage) SQ FT","p":50.17,"c":"Bathroom Extras","s":"Demo Extras","d":"Remove and haul out existing tile to expose rotten subfloor. Price is per square foot Replace subfloor with new OSB for increased structural integrity of floor before installing new flooring."},{"i":"wc1365","n":"ADDING A CLOSET TO A BATHROOM PER SQFT","p":315.82,"c":"Bathroom Extras","s":"Framing Extras","d":"Install framing for new closet. Install and finish drywall. Install new door. Install flooring. Install trim. Install shelving. (** Melamine shelving**)"},{"i":"auto_expandingofbathroomp_37461","n":"EXPANDING OF BATHROOM. PER SQFT","p":315.92,"c":"Bathroom Extras","s":"Framing Extras","d":"Demoing and moving of walls of the bathroom to expand or shrink."},{"i":"auto_installingnewprehung_16346","n":"INSTALLING NEW PRE HUNG DOORS","p":2273.13,"c":"Bathroom Extras","s":"Framing Extras","d":"Demo old door. Install new door. Install door moldings. Paint door and door moldings. (**White semi gloss only**)"},{"i":"auto_floorrasingsqft_19844","n":"FLOOR RASING (sq Ft)","p":44.54,"c":"Bathroom Extras","s":"Framing Extras","d":"Install OSB sheeting to raise the flooring. (per sq foot)"},{"i":"auto_subfloorreplacement_40846","n":"SUBFLOOR REPLACEMENT","p":61.99,"c":"Bathroom Extras","s":"Framing Extras","d":"Demo old sub floor. Frame floor joists where needed. Install new subfloor with glue and ring shank nails. DOES NOT INCLUDE replacement of ROTTED floor joist/s"},{"i":"auto_cuttingshowerwalltoh_38345","n":"CUTTING SHOWER WALL TO HALF WALL FOR TILE","p":1274.55,"c":"Bathroom Extras","s":"Framing Extras","d":"CUT FULL WALL IN HALF. INSTALL SILL ON TOP OF WALL. DRYWALL AND PAINT ONE WALL WHERE DRYWALL IS OPEN. (***SHOWER SURROUND MUST BE UPED TO NEXT SIZE***)"},{"i":"wc1369","n":"INSTALLING NON EXISTING EXHUAST FAN","p":3880.58,"c":"Bathroom Extras","s":"HVAC Extras","d":"New electrical for exhaust fan.    Installing new"},{"i":"wc1371","n":"MOVING HEAT VENT OR COLD AIR RETURN","p":1554.21,"c":"Bathroom Extras","s":"HVAC Extras","d":"Moving location of a heat run or return air vent."},{"i":"auto_replacinganexistinge_43179","n":"REPLACING AN EXISTING EXHAUST FAN","p":1339.01,"c":"Bathroom Extras","s":"HVAC Extras","d":"Pull out old exhaust fan. Install new exhaust fan. (***DOES NOT INCLUDE DUCTING VENT OUT SIDE OF THE HOUSE***) (*** IF DUCTING IS NO PRESENT AND ADDITIONAL COST WILL BE APPLLIED AND PAID FOR IMMEDIATLY BEFORE ANY WORK BEGINS***)"},{"i":"wc1372","n":"INSTALLING A LIGHTED MIRROR","p":2457.22,"c":"Bathroom Extras","s":"Electrical Extras","d":"Install electrical for lighted mirror.    Hang new"},{"i":"wc1375","n":"MOVE PLUGS","p":1554.33,"c":"Bathroom Extras","s":"Electrical Extras","d":"Move location of plugs.    **Moving more than a fe"},{"i":"auto_installnonexistingva_09351","n":"INSTALL NON EXISTING VANITY LIGHT","p":1742.22,"c":"Bathroom Extras","s":"Electrical Extras","d":"Running new electrical for non existing vanity light. Moving light in a soffit to the wall above the vanity."},{"i":"auto_movevanitylight_25778","n":"MOVE VANITY LIGHT","p":1554.33,"c":"Bathroom Extras","s":"Electrical Extras","d":"Move vanity light. **Moving more than a few inches**"},{"i":"auto_install20ampgfiforja_23016","n":"INSTALL 20 AMP GFI FOR JAQUZZI TUB NOT EXISTING","p":2450.0,"c":"Bathroom Extras","s":"Electrical Extras","d":"Install 20 amp GFI for new installation of a jetted tub."},{"i":"wc1378","n":"EXISTING DOUBLE VANITY ADD ON","p":1551.44,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Extra Faucet. Extra Mirror. Extra Light."},{"i":"wc1379","n":"MOVING SINGLE VANITY LOCATION","p":7016.0,"c":"Bathroom Extras","s":"Plumbing Extras","d":"plumbing relocation Moving vanity across the room in a different location. Moving electrical for GFI plugs. Moving light location."},{"i":"wc1382","n":"MOVING DOUBLE VANITY LOCATION","p":8476.17,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Moving vanity across the room to a different location. Moving electrical for GFI plugs. Moving light location. Includes extra light. Includes extra faucet. Includes extra mirror. Includes major plumbing."},{"i":"auto_singlesinkinstalling_43723","n":"**SINGLE SINK**  INSTALLING LARGER VANITY THAN EXISTING","p":1671.05,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Installing a new vanity that is larger than the existing vanity with a single sink. Move vanity light."},{"i":"auto_singlesinktodoublesi_39214","n":"**SINGLE SINK TO DOUBLE SINK**  INSTALLING A VANITY LARGER THAN EXISTING","p":5001.32,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Installing a larger vanity than existing single sink to double sink. Includes extra mirror. Includes extra light. Includes extra faucet."},{"i":"auto_majorplumbingchanges_36642","n":"MAJOR PLUMBING CHANGES","p":5494.86,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Moving a shower or a toilet or adding a free standing tub. (Based on if one moves they all move)"},{"i":"auto_additionalshowerdive_89817","n":"ADDITIONAL SHOWER DIVERTER ADD ON","p":1725.23,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Install new shower diverter and tap in new supply lines for second diverter."},{"i":"auto_nonexistingshoweradd_62708","n":"NON EXISTING SHOWER ADD ON","p":5471.33,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Adding new 2 inch drain system into existing plumbing. Adding new supply lines to shower diverter. Adding framing for new shower/bathtub."},{"i":"auto_freestandingtubrepla_72310","n":"FREE STANDING TUB REPLACEMENT","p":3938.36,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Replacing a free standing tub where an existing free standing tub is. (This does not include moving freestanding tub placement)."},{"i":"auto_curblessshower_49304","n":"CURBLESS SHOWER","p":8194.51,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Demo old shower. Cut floor joists to except a flush kerdie pan. Installation of linear drain. MOVE TO TILE EXTRAS"},{"i":"auto_extendtheshowerlarge_80304","n":"EXTEND THE SHOWER LARGER THAN EXISTING","p":2983.11,"c":"Bathroom Extras","s":"Plumbing Extras","d":"Move wall to enlarge shower. Move shower diverter plumbing and drain."},{"i":"wc1565","n":"POT FILLERS - Existing, Chrome","p":1275.21,"c":"Kitchen","s":"Pot Filler","d":"Contemporary Wall Mount Pot Filler in Chrome Model#: 1165LF","sup":"ETNA","f1l":"Status","f1v":"Existing","f2l":"Color","f2v":"Chrome"},{"i":"wc1566","n":"POT FILLERS - Existing, Champagne Bronze","p":1863.64,"c":"Kitchen","s":"Pot Filler","d":"Contemporary Wall Mount Pot Filler in Champagne Bronze Model#: 1165LF-CZ","sup":"ETNA","f1l":"Status","f1v":"Existing","f2l":"Color","f2v":"Champagne Bronze"},{"i":"wc1567","n":"POT FILLERS - Existing, Matte Black","p":1735.95,"c":"Kitchen","s":"Pot Filler","d":"Features:Dual shut off on the Delta Pot Filler faucet allows the user to turn the water off at either the wall or the spout, controlling the water flow at the point of use 24 in. dual swing joints allow the pot filler to easily fold away when not in use  Simple on and off with a quarter turn of the handle Simple on and off with a quarter turn of the handle Meets standards set by Americans with Disabilities Act (ADA) Single hole installation Assembled dimensions: 8-1/8 in. H x 21-9/16 in. D x 2-1/8 in. W","sup":"ETNA","f1l":"Status","f1v":"Existing","f2l":"Color","f2v":"Matte Black"},{"i":"wc1568","n":"POT FILLERS - Existing, Stainless","p":1711.79,"c":"Kitchen","s":"Pot Filler","d":"Contemporary Wall Mount Pot Filler in Stainless Model#: 1165LF-AR","sup":"ETNA","f1l":"Status","f1v":"Existing","f2l":"Color","f2v":"Stainless"},{"i":"wc4935","n":"POT FILLERS - Non Existing Open Ceiling, Stainless","p":3711.79,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Open Ceiling","f2l":"Color","f2v":"Stainless"},{"i":"wc4936","n":"POT FILLERS - Non Existing Open Ceiling, Matte Black","p":3735.95,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Open Ceiling","f2l":"Color","f2v":"Matte Black - Non Existing..."},{"i":"wc4937","n":"POT FILLERS - Non Existing Open Ceiling, Champagne Bronze","p":3863.64,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Open Ceiling","f2l":"Color","f2v":"Champagne Bronze - Non Exi..."},{"i":"wc4938","n":"POT FILLERS - Non Existing Open Ceiling, Chrome","p":3275.21,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Open Ceiling","f2l":"Color","f2v":"Chrome"},{"i":"wc4939","n":"POT FILLERS - Non Existing Closed Ceiling, Stainless","p":5211.79,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Closed Ceiling","f2l":"Color","f2v":"Stainless - Non Existing..."},{"i":"wc4940","n":"POT FILLERS - Non Existing Closed Ceiling, Matte Black","p":5235.95,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Closed Ceiling","f2l":"Color","f2v":"Matte Black - Non Existi..."},{"i":"wc4941","n":"POT FILLERS - Non Existing Closed Ceiling, Champagne Bronze","p":5363.64,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Closed Ceiling","f2l":"Color","f2v":"Champagne Bronze - Non E..."},{"i":"wc4942","n":"POT FILLERS - Non Existing Closed Ceiling, Chrome","p":4775.21,"c":"Kitchen","s":"Pot Filler","sup":"ETNA","f1l":"Status","f1v":"Non Existing Closed Ceiling","f2l":"Color","f2v":"Chrome"},{"i":"wc3226","n":"KITCHEN SINK FAUCETS - Nicoli, Stainless, Square","p":683.33,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Stainless Model#: 19868LF-SS","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Stainless","f3l":"Type","f3v":"Square"},{"i":"wc1574","n":"KITCHEN SINK FAUCETS - Antoni, Chrome, Round","p":893.86,"c":"Kitchen","s":"Sink Faucets","d":"Single-Handle Pull-Down Spring Kitchen Faucet in Chrome Model#: 18803-DST","sup":"AMZ","f1l":"Style","f1v":"Antoni","f2l":"Color","f2v":"Chrome","f3l":"Type","f3v":"Round"},{"i":"wc1576","n":"KITCHEN SINK FAUCETS - Antoni, Champagne Bronze, Round","p":1251.06,"c":"Kitchen","s":"Sink Faucets","d":"Single-Handle Pull-Down Spring Kitchen Faucet in Champagne Bronze Model#: 18803-CZ-DST","sup":"AMZ","f1l":"Style","f1v":"Antoni","f2l":"Color","f2v":"Champagne Bronze","f3l":"Type","f3v":"Round"},{"i":"wc1578","n":"KITCHEN SINK FAUCETS - Antoni, Matte Black, Round","p":1098.34,"c":"Kitchen","s":"Sink Faucets","d":"Single-Handle Pull-Down Spring Kitchen Faucet in Matte Black Model#: 18803-BL-DST","sup":"AMZ","f1l":"Style","f1v":"Antoni","f2l":"Color","f2v":"Matte Black","f3l":"Type","f3v":"Round"},{"i":"wc1580","n":"KITCHEN SINK FAUCETS - Antoni, Stainless, Round","p":995.67,"c":"Kitchen","s":"Sink Faucets","d":"Single-Handle Pull-Down Spring Kitchen Faucet in Stainless Model#: 18803-SP-DST","sup":"AMZ","f1l":"Style","f1v":"Antoni","f2l":"Color","f2v":"Stainless","f3l":"Type","f3v":"Round"},{"i":"wc1582","n":"KITCHEN SINK FAUCETS - Nicoli, Chrome, Round","p":503.87,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Chrome Model#: 19867LF","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Chrome","f3l":"Type","f3v":"Round"},{"i":"wc1583","n":"KITCHEN SINK FAUCETS - Nicoli, Chrome, Square","p":534.94,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Chrome Model#: 19868LF","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Chrome","f3l":"Type","f3v":"Square"},{"i":"wc1584","n":"KITCHEN SINK FAUCETS - Nicoli, Champagne Bronze, Round","p":773.06,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Champagne Bronze Model#: 19867LF-CZ","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Champagne Bronze","f3l":"Type","f3v":"Round"},{"i":"wc1585","n":"KITCHEN SINK FAUCETS - Nicoli, Champagne Bronze, Square","p":802.4,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Champagne Bronze Model#: 19868LF-CZ","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Champagne Bronze","f3l":"Type","f3v":"Square"},{"i":"wc1586","n":"KITCHEN SINK FAUCETS - Nicoli, Matte Black, Round","p":654.0,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Matte Black Model#: 19867LF-BL","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Matte Black","f3l":"Type","f3v":"Round"},{"i":"wc1587","n":"KITCHEN SINK FAUCETS - Nicoli, Matte Black, Square","p":683.33,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Matte Black Model#: 19868LF-BL","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Matte Black","f3l":"Type","f3v":"Square"},{"i":"wc1588","n":"KITCHEN SINK FAUCETS - Nicoli, Stainless, Round","p":654.0,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Stainless Model#: 19867LF-SS","sup":"AMZ","f1l":"Style","f1v":"Nicoli","f2l":"Color","f2v":"Stainless","f3l":"Type","f3v":"Round"},{"i":"wc1590","n":"KITCHEN SINK FAUCETS - Coranto, Chrome, Round","p":840.36,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Chrome Model#: 9179-DST","sup":"AMZ","f1l":"Style","f1v":"Coranto","f2l":"Color","f2v":"Chrome","f3l":"Type","f3v":"Round"},{"i":"wc1592","n":"KITCHEN SINK FAUCETS - Coranto, Champagne Bronze, Round","p":1225.17,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Champagne Bronze Model#: 9179-CZ-DST","sup":"AMZ","f1l":"Style","f1v":"Coranto","f2l":"Color","f2v":"Champagne Bronze","f3l":"Type","f3v":"Round"},{"i":"wc1595","n":"KITCHEN SINK FAUCETS - Coranto, Matte Black, Round","p":918.01,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Matte Black Model#: 9179-BL-DST","sup":"AMZ","f1l":"Style","f1v":"Coranto","f2l":"Color","f2v":"Matte Black","f3l":"Type","f3v":"Round"},{"i":"wc1596","n":"KITCHEN SINK FAUCETS - Coranto, Stainless, Round","p":918.01,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Arctic Stainless Model#: 9179-AR-DST","sup":"AMZ","f1l":"Style","f1v":"Coranto","f2l":"Color","f2v":"Stainless","f3l":"Type","f3v":"Round"},{"i":"wc1598","n":"KITCHEN SINK FAUCETS - Essa, Chrome, Round","p":764.44,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Chrome Model#: 9113-DST","sup":"AMZ","f1l":"Style","f1v":"Essa","f2l":"Color","f2v":"Chrome","f3l":"Type","f3v":"Round"},{"i":"wc1600","n":"KITCHEN SINK FAUCETS - Essa, Champagne Bronze, Round","p":1123.36,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Champagne Bronze Model#: 9113-CZ-DST","sup":"AMZ","f1l":"Style","f1v":"Essa","f2l":"Color","f2v":"Champagne Bronze","f3l":"Type","f3v":"Round"},{"i":"wc1602","n":"KITCHEN SINK FAUCETS - Essa, Matte Black, Round","p":867.07,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Matte Black Model#: 9113-BL-DST","sup":"AMZ","f1l":"Style","f1v":"Essa","f2l":"Color","f2v":"Matte Black","f3l":"Type","f3v":"Round"},{"i":"wc1604","n":"KITCHEN SINK FAUCETS - Essa, Stainless, Round","p":842.09,"c":"Kitchen","s":"Sink Faucets","d":"Single Handle Pull-Down Kitchen Faucet in Stainless Model#: 9113-AR-DST","sup":"AMZ","f1l":"Style","f1v":"Essa","f2l":"Color","f2v":"Stainless","f3l":"Type","f3v":"Round"},{"i":"wc1636","n":"GLASS RINSER - Chrome","p":560.82,"c":"Kitchen","s":"Glass Rinser","d":"Metal Glass Rinser in Chrome Model#: GR250","sup":"ETNA","f1l":"Color","f1v":"Chrome"},{"i":"wc1637","n":"GLASS RINSER - Champagne Bronze","p":738.55,"c":"Kitchen","s":"Glass Rinser","d":"Metal Glass Rinser in Champagne Bronze  Model#: GR250-CZ","sup":"ETNA","f1l":"Color","f1v":"Champagne Bronze"},{"i":"wc1638","n":"GLASS RINSER - Matte Black","p":738.55,"c":"Kitchen","s":"Glass Rinser","d":"Metal Glass Rinser in Matte Black Model#: GR250-BL","sup":"ETNA","f1l":"Color","f1v":"Matte Black"},{"i":"wc1639","n":"GLASS RINSER - Stainless","p":662.63,"c":"Kitchen","s":"Glass Rinser","d":"Metal Glass Rinser in Stainless Model#: GR250-AR","sup":"ETNA","f1l":"Color","f1v":"Stainless"},{"i":"wc1645","n":"SOAP DISPENSER - Chrome","p":226.05,"c":"Kitchen","s":"Soap Dispensers","d":"Metal Soap Dispenser in Chrome Model#: RP100734","sup":"ETNA","f1l":"Color","f1v":"Chrome"},{"i":"wc1646","n":"SOAP DISPENSER - Champagne Bronze","p":279.54,"c":"Kitchen","s":"Soap Dispensers","d":"Metal Soap Dispenser in Champagne Bronze Model#: RP100734CZ","sup":"ETNA","f1l":"Color","f1v":"Champagne Bronze"},{"i":"wc1647","n":"SOAP DISPENSER - Matte Black","p":239.85,"c":"Kitchen","s":"Soap Dispensers","d":"Metal Soap Dispenser in Matte Black Model#: RP100734BL","sup":"ETNA","f1l":"Color","f1v":"Matte Black"},{"i":"wc1648","n":"SOAP DISPENSER - Stainless","p":239.85,"c":"Kitchen","s":"Soap Dispensers","d":"Metal Soap Dispenser in Arctic Stainless Model#: RP100734AR","sup":"ETNA","f1l":"Color","f1v":"Stainless"},{"i":"wc1654","n":"BEVERAGE FAUCET - Chrome","p":636.74,"c":"Kitchen","s":"Beverage Faucet","d":"Contemporary Round Beverage Faucet in Chrome Model#: 1930-DST","sup":"ETNA","f1l":"Color","f1v":"Chrome"},{"i":"wc1655","n":"BEVERAGE FAUCET - Champagne Bronze","p":918.01,"c":"Kitchen","s":"Beverage Faucet","d":"Contemporary Round Beverage Faucet in Champagne Bronze  Model#: 1930-CZ-DST","sup":"ETNA","f1l":"Color","f1v":"Champagne Bronze"},{"i":"wc1656","n":"BEVERAGE FAUCET - Matte Black","p":766.16,"c":"Kitchen","s":"Beverage Faucet","d":"Contemporary Round Beverage Faucet in Matte Black Model#: 1930-BL-DST","sup":"ETNA","f1l":"Color","f1v":"Matte Black"},{"i":"wc1657","n":"BEVERAGE FAUCET - Stainless","p":764.44,"c":"Kitchen","s":"Beverage Faucet","d":"Contemporary Round Beverage Faucet in Arctic Stainless Model#: 1930-AR-DST","sup":"ETNA","f1l":"Color","f1v":"Stainless"},{"i":"wc1665","n":"36 INCH BASE DOUBLE SINK - Mcallister","p":908.81,"c":"Kitchen","s":"Kitchen Sinks","d":"Mcallister 32\" Undermount Double Bowl Kitchen Sink  11406-NA","f1l":"Model","f1v":"Mcallister"},{"i":"wc1666","n":"36 INCH BASE DOUBLE SINK - Cairn Slim Matte Black","p":1387.38,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn Slim Divide 33-1/2\" Undermount Double Bowl Neoroc Granite Composite Kitchen Sink with Large Bowl Sink Rack K-8204-CM1","f1l":"Model","f1v":"Cairn Slim Matte Black"},{"i":"wc1667","n":"36 INCH BASE DOUBLE SINK - Cairn Slim Gray","p":1387.38,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn Slim Divide 33-1/2\" Undermount Double Bowl Neoroc Granite Composite Kitchen Sink with Large Bowl Sink Rack  K-8204-CM4","f1l":"Model","f1v":"Cairn Slim Gray"},{"i":"wc1668","n":"36 INCH BASE DOUBLE SINK - Cairn Slim Light Gray","p":1387.38,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn Slim Divide 33-1/2\" Undermount Double Bowl Neoroc Granite Composite Kitchen Sink with Large Bowl Sink Rack  K-8204-CM3","f1l":"Model","f1v":"Cairn Slim Light Gray"},{"i":"wc1674","n":"HOOD VENTS - Install New - Existing, 30 Inch, Stainless, Winflo","p":2830.16,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Winflo 30 inch Convertible 300-CFM Stainless steel Wall-Mounted Range Hood Item #1711477 | Model #LRW03C30","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Stainless Winflo"},{"i":"wc1675","n":"HOOD VENTS - Install New - Existing, 30 Inch, Stainless, Broan","p":3129.32,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Broan 30 inch Convertible 350-CFM StainlessSteel Under Cabinet Range Hood Item #1246071 | Model #MTR1303SS","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Stainless Broan"},{"i":"wc1679","n":"HOOD VENTS - Install New - Existing, 30 Inch, Black, Winflo","p":2973.96,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Winflo 30 inch Convertible 300-CFM Black Wall-Mounted Range Hood Item #1361472 | Model #LRW03C30BL","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Black Winflo"},{"i":"wc1680","n":"HOOD VENTS - Install New - Existing, 30 Inch, Black, Broan","p":3043.04,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Broan 30 inch Convertible 350-CFM Black Under Cabinet Range Hood Item #6592198 | Model #MTR1303BL","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Black Broan"},{"i":"wc1686","n":"HOOD VENTS - Install New - Existing, 36 Inch, Stainless, Vikio","p":3362.28,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* VIKIO 36 inch Ducted 780-CFM Recirculating Stainless steel Wall-Mounted Range Hood with Charcoal Filter Item #4842891 | Model #PA0136A","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Stainless Vikio"},{"i":"wc1688","n":"HOOD VENTS - Install New - Existing, 36 Inch, Stainless, Streamline","p":3388.16,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Streamline 36 inch Convertible 165-CFM Stainless Steel Under Cabinet Range Hood with Charcoal Filter Item #6789617 | Model #T-8731-1-CL","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Stainless Streamline"},{"i":"wc1691","n":"HOOD VENTS - Install New - Existing, 36 Inch, Black, Vikio","p":3362.28,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* VIKIO 36 inch Convertible 900-CFM Black Wall-Mounted Range Hood with Charcoal Filter Item #6507867 | Model #VIKP0236BSS","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Black Vikio"},{"i":"wc1692","n":"HOOD VENTS - Install New - Existing, 36 Inch, Black, Cosmo","p":3519.58,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING 1. Remove old hood vent. 2. Install a new hood vent in its place. *Does not include the costs to vent out of the house, this will be an added cost* Cosmo 36 inch Ducted 500-CFM Black Under Cabinet Range Hood Item #6789651 | Model #COS-KS6U36-BK","sup":"LOW","f1l":"Status","f1v":"Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Black Cosmo"},{"i":"wc4861","n":"HOOD VENTS - Install New - Non Existing, 30 Inch, Black, Broan","p":4872.33,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Broan 30 inch Convertible 350-CFM Black Under Cabinet Range Hood Item #6592198 | Model #MTR1303BL","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Black Broan"},{"i":"wc4862","n":"HOOD VENTS - Install New - Non Existing, 30 Inch, Black, Winflo","p":4803.25,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Winflo 30 inch Convertible 300-CFM Black Wall-Mounted Range Hood Item #1361472 | Model #LRW03C30BL","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Black Winflo"},{"i":"wc4863","n":"HOOD VENTS - Install New - Non Existing, 30 Inch, Stainless, Broan","p":4958.61,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Broan 30 inch Convertible 350-CFM StainlessSteel Under Cabinet Range Hood Item #1246071 | Model #MTR1303SS","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Stainless Broan"},{"i":"wc4864","n":"HOOD VENTS - Install New - Non Existing, 30 Inch, Stainless, Winflo","p":4659.45,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Winflo 30 inch Convertible 300-CFM Stainless steel Wall-Mounted Range Hood Item #1711477 | Model #LRW03C30","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"30 Inch","f3l":"Color","f3v":"Stainless Winflo"},{"i":"wc4865","n":"HOOD VENTS - Install New - Non Existing, 36 Inch, Black, Cosmo","p":5348.87,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Cosmo 36 inch Ducted 500-CFM Black Under Cabinet Range Hood Item #6789651 | Model #COS-KS6U36-BK","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Black Cosmo"},{"i":"wc4866","n":"HOOD VENTS - Install New - Non Existing, 36 Inch, Black, Vikio","p":5191.57,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. VIKIO 36 inch Convertible 900-CFM Black Wall-Mounted Range Hood with Charcoal Filter Item #6507867 | Model #VIKP0236BSS","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Black Vikio"},{"i":"wc4867","n":"HOOD VENTS - Install New - Non Existing, 36 Inch, Stainless, Stream...","p":5217.45,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. Streamline 36 inch Convertible 165-CFM Stainless Steel Under Cabinet Range Hood with Charcoal Filter Item #6789617 | Model #T-8731-1-CL","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Stainless Stream..."},{"i":"wc4868","n":"HOOD VENTS - Install New - Non Existing, 36 Inch, Stainless, Vikio","p":5191.57,"c":"Kitchen","s":"Hood Vents","d":"INSTALL A NON EXISTING HOOD VENT 1. Run ductwork out side the home. 2. Install new exhaust hood. VIKIO 36 inch Ducted 780-CFM Recirculating Stainless steel Wall-Mounted Range Hood with Charcoal Filter Item #4842891 | Model #PA0136A","sup":"LOW","f1l":"Status","f1v":"Non Existing","f2l":"Size","f2v":"36 Inch","f3l":"Color","f3v":"Stainless Vikio"},{"i":"wc1703","n":"SINGLE BOWL SINKS - 30 Inch, Matte Grey","p":1147.52,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn 27-1/2\" Undermount Single Bowl Neoroc Granite Composite Kitchen Sink with Bottom Sink Rack K-28000-CM4","sup":"AG","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Matte Grey"},{"i":"wc1704","n":"SINGLE BOWL SINKS - 30 Inch, Matte Black","p":1147.52,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn 27-1/2\" Undermount Single Bowl Neoroc Granite Composite Kitchen Sink with Bottom Sink Rack  K-28000-CM1","sup":"AG","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Matte Black"},{"i":"wc1705","n":"SINGLE BOWL SINKS - 30 Inch, Matte Taupe","p":1147.52,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn 27-1/2\" Undermount Single Bowl Neoroc Granite Composite Kitchen Sink with Bottom Sink Rack  K-28000-CM3","sup":"AG","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Matte Taupe"},{"i":"wc1707","n":"SINGLE BOWL SINKS - 36 Inch, Matte Grey","p":1265.44,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn Undermount Granite composite Basin Sink-Matte Grey  K-8206-CM4","sup":"AG","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Matte Grey"},{"i":"wc1708","n":"SINGLE BOWL SINKS - 36 Inch, Matte Black","p":1265.44,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn 33 1/2\" Undermount Single Bowl  Kitchen Sink - Matte Black  K-8206-CM1","sup":"AG","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Matte Black"},{"i":"wc1709","n":"SINGLE BOWL SINKS - 36 Inch, Matte Taupe","p":1265.44,"c":"Kitchen","s":"Kitchen Sinks","d":"Cairn 33 1/2\" Undermount Single Bowl  Kitchen Sink - Matte Taupe  K-8206-CM3","sup":"AG","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Matte Taupe"},{"i":"wc1710","n":"SINGLE BOWL SINKS - 36 Inch, Stainless","p":1718.58,"c":"Kitchen","s":"Kitchen Sinks","d":"Ludington 32\" Undermount Single Bowl Sink  20022-PC-NA","sup":"AG","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Stainless"},{"i":"wc1719","n":"WORK STATIONS - 30 Inch","p":1470.21,"c":"Kitchen","s":"Kitchen Sinks","d":"Lorelai 27' Workstation Kitchen Sink Undermount 16 Gauge Stainless Steel Single Bowl with WorkFlow Ledge and Accessories Model: 95B932-27S-SS","sup":"AG","f1l":"Size","f1v":"30 Inch"},{"i":"wc1720","n":"WORK STATIONS - 36 Inch","p":1470.21,"c":"Kitchen","s":"Kitchen Sinks","d":"Lorelai 32' Workstation Kitchen Sink Undermount 16 Gauge Stainless Steel Single Bowl with WorkFlow Ledge and Accessories 95B932-32S-SS","sup":"AG","f1l":"Size","f1v":"36 Inch"},{"i":"wc2392","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Winslow, Stainless","p":445.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow Pendant Stainless The Winslow 7\" 1 light mini pendant features a classic look with its Brushed Nickel finish and clear seeded glass. Winslow mini pendant is perfect in several aesthetic environments, including traditional and transitional.   SKU:  070588 Kichler#: 44032NI   Width / Diameter: 4.25\"  Height:  7.50\"  Weight: 2.60 lb  Chain:36``  Rod:36\"  Wire:96\"  Canopy: 4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Winslow"},{"i":"wc2393","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Winslow, Brass","p":445.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow Pendant Natural Brass Update your space with the clean, classic, early-electric  look of the Winslow 1-light mini pendant. A focal piece that's sure to be all the rage, this Winslow fixture easily jazzes up luxe industrial lifestyles. Winslow's clear seeded glass filters light beautifully and is removeable for ease of cleaning or replacement. Plus, its on-trend natural brass finish offers an exciting contrast to light walls and is easy to coordinate with other lighting, hardware, and plumbing fixtures. SKU:  6146230  Kichler#: 44032NBR   Width / Diameter:4.25\"   Height:7.25\"  Weight:2.60 lb   Rod:36\"  Wire:96\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Winslow"},{"i":"wc2394","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Winslow, Matte Black","p":445.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Winslow Matte Black The modern Winslow 1-light mini pendant in a Black finish with Clear Seeded glass shade pair beautifully with the linear arms, bringing light and dimension to a space. SKU:  6990137  Kichler#: 44032BK   Width / Diameter:4.25\"   Height:7.50\"   Weight:2.60 lb  Chain:36``  Rod:36\"  Wire:96\"  Canopy: 4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Winslow"},{"i":"wc2398","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Everly, Stainless","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly 1-light pendant -Stainless A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear glass silhouette that provides ambient lighting to the entire room. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space. SKU:  6431519  Kichler#: 42200NI  Width / Diameter:14.25\"  Height:15.50\"  Weight:8.37 lb   Rod:36\"  Wire:120\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Everly"},{"i":"wc2399","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Everly, Brass","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly 1-light pendant -Natural Brass A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear seeded glass that creates a soft, ambient glow, adding warmth as it shines. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space SKU:  6431529  Kichler#: 42200NBRCS   Width / Diameter:14.25\"  Height:15.50\"  Weight: 8.37 lb  Rod:36\"  Wire:120\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Everly"},{"i":"wc2400","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Everly, Matte Black","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly Large 1-light pendant -Black A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear glass silhouette that provides ambient lighting to the entire room. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space SKU:  6431539   Kichler#: 42200BK   Width / Diameter:14.25\"  Height:15.50\"  Weight:8.37 lb   Rod:36\"  Wire:120\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Everly"},{"i":"wc2401","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Zailey, Stainless","p":494.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -White The Zailey 9\" 1 light pendant features a contemporary look with its White dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990713   Kichler#: 52152WH  Width / Diameter:11.50\"  Height:9.00\"  Weight:2.70 lb   Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Zailey"},{"i":"wc2402","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Zailey, Brass","p":647.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -Natural Brass The Zailey 12.5\" 1 light pendant features a contemporary look with its Natural Brass dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990711   Kichler#: 52153NBR   Width / Diameter:15.75\"   Height:12.50\"  Weight:4.90 lb   Wire:120\"   Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Zailey"},{"i":"wc2403","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Zailey, Matte Black","p":664.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -Black The Zailey 12.5\" 1 light pendant features a contemporary look with its Black dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990712   Kichler#: 52153BK   Width / Diameter:15.75\"   Height:12.50\"   Weight:4.90 lb   Wire:120\"   Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Zailey"},{"i":"wc2413","n":"KITCHEN LIGHTING - Pendant, Replace, Dome, Avery, Stainless","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Stainless Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket completes the look. SKU:  6434974   Kichler#: 43912NI   Width / Diameter:14.00\"   Height:11.00\"   Weight:5.36 lb   Rod:36\"  Wire:120\"  Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Avery"},{"i":"wc2414","n":"KITCHEN LIGHTING - Pendant, Replace, Dome, Avery, Brass","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Natural Brass Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket  completes the look. SKU:  6434971  Kichler#: 43912NBR   Width / Diameter:14.00\"   Height:11.00\"   Weight:5.36 lb   Rod:36\"   Wire:120\"  Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Avery"},{"i":"wc2415","n":"KITCHEN LIGHTING - Pendant, Replace, Dome, Avery, Matte Black","p":903.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Black Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket  completes the look. SKU:  6434972  Kichler#: 43912BK   Width / Diameter:14.00\"  Height:11.00\"   Weight:5.36 lb  Rod:36\"  Wire:120\"   Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Avery"},{"i":"wc2482","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Winslow, Stainless","p":1873.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow Pendant Stainless The Winslow 7\" 1 light mini pendant features a classic look with its Brushed Nickel finish and clear seeded glass. Winslow mini pendant is perfect in several aesthetic environments, including traditional and transitional. SKU:  070588    Kichler#: 44032NI   Width / Diameter:4.25\"   Height:7.50\"   Weight:2.60 lb   Chain:36``  Rod:36\"   Wire:96\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Winslow"},{"i":"wc2483","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Winslow, Brass","p":1873.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow Pendant Brass Update your space with the clean, classic, early-electric  look of the Winslow 1-light mini pendant. A focal piece that's sure to be all the rage, this Winslow fixture easily jazzes up luxe industrial lifestyles. Winslow's clear seeded glass filters light beautifully and is removeable for ease of cleaning or replacement. Plus, its on-trend natural brass finish offers an exciting contrast to light walls and is easy to coordinate with other lighting, hardware, and plumbing fixtures. SKU:  6146230   Kichler#: 44032NBR    Width / Diameter:4.25\"   Height:7.25\"   Weight:2.60 lb   Rod:36\"   Wire:96\"   Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Winslow"},{"i":"wc2484","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Winslow, Matte B...","p":1873.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Winslow Matte Black The modern Winslow 1-light mini pendant in a Black finish with Clear Seeded glass shade pair beautifully with the linear arms, bringing light and dimension to a space. SKU:  6990137   Kichler#: 44032BK   Width / Diameter:4.25\"   Height:7.50\"   Weight:2.60 lb   Chain:36``  Rod:36\"   Wire:96\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Winslow"},{"i":"wc2488","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Everly, Stainless","p":2477.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly 1-light pendant -Stainless A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear glass silhouette that provides ambient lighting to the entire room. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space. SKU:  6431519   Kichler#: 42200NI   Width / Diameter:14.25\"   Height:15.50\"   Weight:8.37 lb   Rod:36\"   Wire:120\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Everly"},{"i":"wc2489","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Everly, Brass","p":2435.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly 1-light pendant -Natural Brass A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear seeded glass that creates a soft, ambient glow, adding warmth as it shines. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space SKU:  6431529   Kichler#: 42200NBRCS   Width / Diameter:14.25\"   Height:15.50\"   Weight:8.37 lb   Rod:36\"   Wire:120\"   Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Everly"},{"i":"wc2490","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Everly, Matte Black","p":2411.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Everly Large 1-light pendant -Black A modern style with minimal detailing, the Everly 1-light pendant easily elevates the style of soft modern environments. This elegant pendant offers a conical form and contemporary, clear glass silhouette that provides ambient lighting to the entire room. As beautiful as it is versatile,  adjust the hanging height to meet the needs of your space SKU:  6431539   Kichler#: 42200BK   Width / Diameter:14.25\"   Height:15.50\"  Weight:8.37 lb  Rod:36\"  Wire:120\"  Canopy:4.75 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Everly"},{"i":"wc2491","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Zailey, Stainless","p":2096.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -White The Zailey 9\" 1 light pendant features a contemporary look with its White dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990713  Kichler#: 52152WH   Width / Diameter:11.50\"   Height:9.00\"   Weight:2.70 lb   Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Zailey"},{"i":"wc2492","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Zailey, Brass","p":2147.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -Natural Brass The Zailey 12.5\" 1 light pendant features a contemporary look with its Natural Brass dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990711   Kichler#: 52153NBR    Width / Diameter:15.75\"   Height:12.50\"   Weight:4.90 lb  Wire:120\"   Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Zailey"},{"i":"wc2493","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Zailey, Matte Black","p":2152.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Zailey Pendant -Black The Zailey 12.5\" 1 light pendant features a contemporary look with its Black dome shaped shade. A perfect addition to any aesthetic environments including industrial, contemporary and transitional. SKU:  6990712   Kichler#: 52153BK   Width / Diameter: 15.75\"   Height:12.50\"   Weight:4.90 lb   Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Zailey"},{"i":"wc2503","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Dome, Avery, Stainless","p":2403.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Stainless Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket completes the look. SKU:  6434974   Kichler#: 43912NI   Width / Diameter:14.00\"  Height:11.00\"   Weight:5.36 lb   Rod:36\"  Wire:120\"  Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Avery"},{"i":"wc2504","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Dome, Avery, Brass","p":2403.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Natural Brass Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket  completes the look. SKU:  6434971   Kichler#: 43912NBR   Width / Diameter:14.00\"   Height:11.00\"   Weight:5.36 lb  Rod:36\"   Wire:120\"   Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Avery"},{"i":"wc2505","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Dome, Avery, Matte Black","p":2403.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Avery 1 Light Dome Pendant -Black Offering convenience and ease in coordinating with other lighting options, the Avery 1 Light Dome Pendant is truly as versatile as it is beautiful. Avery's on-trend olde bronze finish creates a classic yet dramatic statement to any space while it complements a variety of decor, including industrial aesthetics. Its clear seeded glass adds to its charm by providing a beautiful, ambient lighting to the entire room and is easy to remove for convenience and ease of cleaning and replacement. A stem with a functional on/off switch on its socket  completes the look. SKU:  6434972  Kichler#: 43912BK    Width / Diameter:14.00\"   Height:11.00\"   Weight:5.36 lb   Rod:36\"   Wire:120\"  Canopy:5 DIA","sup":"RL","f1l":"Type","f1v":"Dome Pendant - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Avery"},{"i":"wc5340","n":"KITCHEN LIGHTING - Pendant, Non-Existing, Pendant, Pure Luxury, Mat...","p":488.16,"c":"Kitchen","s":"Kitchen Lighting","sup":"RL","f1l":"Type","f1v":"Pendant - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Pure Luxury"},{"i":"wc5341","n":"KITCHEN LIGHTING - Pendant, Replace, Pendant, Pure Luxury, Matte Black","p":488.16,"c":"Kitchen","s":"Kitchen Lighting","sup":"RL","f1l":"Type","f1v":"Pendant - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Pure Luxury"},{"i":"wc2620","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Erzo, Stainless","p":2804.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzo 10 Light Linear Chandelier Stainless A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. SKU:  6225891  Kichler#: 52614SN    Width / Diameter:12.75\"   Height:6.75\"   Length:50.00\"   Weight:15.60 lb   Rod:36\"   Wire:144\"   Canopy:14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2621","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Erzo, Brass","p":2804.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzo 10 Light Linear Chandelier Natural Brass A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. SKU:  6225892   Kichler#: 52614NBR   Width / Diameter:12.75\"   Height:6.75\"   Length:50.00\"  Weight:15.60 lb   Rod:36\"   Wire:144\"   Canopy:14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2622","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Erzo, Matte Black","p":2804.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzo 10 Light Linear Chandelier Matte Black  A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. \\n \\nSKU:  6225893 \\nKichler#: 52614BK \\n \\nWidth / Diameter: \\n12.75\" \\nHeight: \\n6.75\" \\nLength: \\n50.00\" \\nWeight: \\n15.60 lb \\nRod: \\n36\" \\nWire: \\n144\" \\nCanopy: \\n14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2623","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Aivian, Stainless","p":2559.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier Stainless The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in an Brushed Nickel finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6379839  Kichler#: 52400NI   Width / Diameter:17.75\"   Height:13.25\"  Length:42.00\"  Weight:18.00 lb   Rod:36\"Wire:96\"  Canopy:11.25 X 5.00","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Aivian"},{"i":"wc2624","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Aivian, Brass","p":2559.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier Natural Brass The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in an upscale Weathered Brass finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6676113   Kichler#: 52400WBR   Width / Diameter:17.50\"   Height:13.00\"  Length:42.00\"  Weight:18.00 lb   Chain:36`` Rod:36\"   Wire:156\"  Canopy:11 X 5","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Aivian"},{"i":"wc2625","n":"KITCHEN LIGHTING - Chandeliers, Replace, Linear, Aivian, Matte Black","p":2559.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier Matte Black The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in a Black finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6379865   Kichler#: 52400BK   Width / Diameter:17.75\"  Height:13.25\"   Length:42.00\"   Weight:18.00 lb   Rod:36\"  Wire:96\"  Canopy:11.25 X 5.00","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Aivian"},{"i":"wc2638","n":"KITCHEN LIGHTING - Chandeliers, Replace, 6 Light, Erzo, Stainless","p":1725.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzo 9.25\" 6 light chandelier in Satin Nickel The Erzo 9.25\" 6 light chandelier in Satin Nickel finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments.  SKU:  893299   Kichler#: 43859SN   Width / Diameter:26.00\"  Height:9.25\"   Weight:8.50 lb  Chain:36``  Rod:36\"  Wire:120\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2639","n":"KITCHEN LIGHTING - Chandeliers, Replace, 6 Light, Erzo, Brass","p":1725.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzo 9.25\" 6 light chandelier in Natural Brass The Erzo 9.25\" 6 light chandelier in Natural Brass finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments. SKU:  893355   Kichler#: 43859NBR   Width / Diameter:26.00\"   Height:9.25\"  Weight:8.50 lb  Chain:36``  Rod:36\"  Wire:120\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2640","n":"KITCHEN LIGHTING - Chandeliers, Replace, 6 Light, Erzo, Matte Black","p":1725.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Erzon 6-Light Chandelier In Black This 6 light chandelier in Black from the soft contemporary Erzo collection is ideal anywhere you want a modern touch. The simple, sleek lines create a stylish accent for your home. SKU:  6990168  Kichler#: 43859BK  Width / Diameter:26.00\"  Height:9.25\"  Weight:8.50 lb  Chain:36``  Rod:36\"  Wire:120\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2644","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Winslow, Stainless","p":1294.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow 8 Light Round Stainless The Winslow 14.75\" 8 light oval chandelier features a classic look with its Brushed Nickel finish and clear seeded glass. Winslow chandelier is perfect in several aesthetic environments, including traditional and transitional. SKU:  525896   Kichler#: 44035NI   Width / Diameter:19.90\"   Height:14.57\"   Length:44.20\"   Weight:15.72 lb  Chain:36``  Rod:36\"   Wire:120\"   Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Winslow"},{"i":"wc2645","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Winslow, Brass","p":1294.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow 8-light chandelier Natural Brass Update your space with the clean, classic, early-electric look of the Winslow 8-light chandelier. A focal piece that's sure to be all the rage, this Winslow fixture easily jazzes up luxe industrial lifestyles. Winslow's clear seeded glass filters light beautifully and is removeable for ease of cleaning or replacement. Plus, its on-trend natural brass finish offers an exciting contrast to light walls and is easy to coordinate with other lighting, hardware, and plumbing fixtures. SKU:  6146226   Kichler#: 44035NBR  Width / Diameter:20.00\"  Height:14.75\"   Length:44.50\"  Weight:15.50 lb  Rod:36\"  Wire:120\"  Canopy:6.00 DIA SKU:  893358  Kichler#: 43857NBR   Width / Diameter:35.50\"   Height:9.25\"   Weight:10.00 lb   Chain:36``  Rod:36\"   Wire:156\"   Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Winslow"},{"i":"wc2646","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Winslow, Matte Black","p":1294.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Winslow 8 light chandelier in Matte Black The modern Winslow 8 light chandelier in a Black finish with Clear Seeded glass shade pair beautifully with the linear arms, bringing light and dimension to a space. SKU:  6990463   Kichler#: 44035BK   Width / Diameter:19.90\"  Height:14.57\"   Length:44.20\"   Weight:15.72 lb   Rod:36\"   Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Winslow"},{"i":"wc2656","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Erzo, Stainless","p":2214.22,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 8 light chandelier in Satin Nickel finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments. SKU:  893350   Kichler#: 43857SN   Width / Diameter:35.50\"   Height:9.25\"   Weight:10.00 lb  Chain:36`` Rod:36\"   Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2657","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Erzo, Brass","p":2214.22,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 8 light chandelier in Natural Brass finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments SKU:  893358  Kichler#: 43857NBR   Width / Diameter:35.50\"   Height:9.25\"  Weight:10.00 lb  Chain:36``   Rod:36\"  Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2658","n":"KITCHEN LIGHTING - Chandeliers, Replace, 8 Light, Erzo, Matte Black","p":2214.22,"c":"Kitchen","s":"Kitchen Lighting","d":"Enzo Matte Black (8-light) This 8 light chandelier in Black from the soft contemporary Erzo collection is ideal anywhere you want a modern touch. The simple, sleek lines create a stylish accent for your home. SKU:  6990167   Kichler#: 43857BK   KichlerWidth / Diameter:35.50\"   Height:9.25\"   Weight:10.00 lb   Chain:36``  Rod:36\"  Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Replace","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2710","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Erzo, Stainless","p":4304.66,"c":"Kitchen","s":"Kitchen Lighting","d":"A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. SKU:  6225891    Kichler#: 52614SN   Width / Diameter:12.75\"  Height:6.75\"  Length:50.00\"  Weight:15.60 lb  Rod:36\"  Wire:144\"  Canopy:14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2711","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Erzo, Brass","p":4304.66,"c":"Kitchen","s":"Kitchen Lighting","d":"A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. SKU:  6225892   Kichler#: 52614NBR   Width / Diameter:12.75\"  Height:6.75\"   Length:50.00\"  Weight:15.60 lb   Rod:36\"   Wire:144\"  Canopy:14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2712","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Erzo, Matte B...","p":4304.66,"c":"Kitchen","s":"Kitchen Lighting","d":"A large yet visually \"light\" sculptural piece, the Erzo 10 Light Linear Chandelier brings a quiet, understated elegance wherever it goes. Its simple clean lines and candlestick design allow light to shine throughout the entire room--creating a warm comforting glow. An on-trend addition in the lighting space, Erzo's oversized length easily meets the needs to coordinate with larger dining tables. Its style is versatile and can complement a variety of environments including mid-century modern and soft modern spaces. SKU:  6225893  Kichler#: 52614BK  Width / Diameter:12.75\"  Height:6.75\"   Length:50.00\"  Weight:15.60 lb  Rod:36\"   Wire:144\"   Canopy:14.25x4.75","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2713","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Aivian, Stain...","p":4059.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in an Brushed Nickel finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6379839   Kichler#: 52400NI   Width / Diameter:17.75\"   Height:13.25\"   Length:42.00\"  Weight:18.00 lb  Rod:36\"  Wire:96\"  Canopy:11.25 X 5.00","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Aivian"},{"i":"wc2714","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Aivian, Brass","p":4059.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in an upscale Weathered Brass finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6676113   Kichler#: 52400WBR  Width / Diameter:17.50\"  Height:13.00\"  Length:42.00\"  Weight:18.00 lb  Chain:36``  Rod:36\"   Wire:156\"  Canopy:11 X 5","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Aivian"},{"i":"wc2715","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, Linear, Aivian, Matte...","p":4059.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Aivian 42\" 8 linear light chandelier scoffs at clich's with its industrial-style arms in a Black finish. Its angled knurled detail is a welcome surprise. When vintage bulbs are used, this piece really comes into its own. It's both refined and edgy, making it truly one of a kind. SKU:  6379865  Kichler#: 52400BK   Width / Diameter:17.75\"  Height:13.25\"   Length:42.00\"   Weight:18.00 lb  Rod:36\"  Wire:96\"   Canopy:11.25 X 5.00","sup":"RL","f1l":"Type","f1v":"Linear Chandelier - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Aivian"},{"i":"wc2728","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 6 Light, Erzo, Stainless","p":3222.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 6 light chandelier in Satin Nickel finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments. SKU:  893299   Kichler#: 43859SN   Width / Diameter:26.00\"  Height:9.25\"  Weight:8.50 lb   Chain:36``  Rod:36\"   Wire:120\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2729","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 6 Light, Erzo, Brass","p":3222.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 6 light chandelier in Natural Brass finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments. SKU:  893355   Kichler#: 43859NBR   Width / Diameter:26.00\"   Height:9.25\"   Weight:8.50 lb   Chain:36``  Rod:36\"   Wire:120\"   Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2730","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 6 Light, Erzo, Matte ...","p":3222.66,"c":"Kitchen","s":"Kitchen Lighting","d":"This 6 light chandelier in Black from the soft contemporary Erzo collection is ideal anywhere you want a modern touch. The simple, sleek lines create a stylish accent for your home. SKU:  6990168   Kichler#: 43859BK   Width / Diameter:26.00\"   Height:9.25\"  Weight:8.50 lb  Chain:36``  Rod:36\"   Wire:120\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"6 Light Chandelier - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2734","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Winslow, Sta...","p":2794.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Winslow 14.75\" 8 light oval chandelier features a classic look with its Brushed Nickel finish and clear seeded glass. Winslow chandelier is perfect in several aesthetic environments, including traditional and transitional. SKU:  525896  Kichler#: 44035NI   Width / Diameter:19.90\"   Height:14.57\"   Length:44.20\"  Weight:15.72 lb  Chain:36`` Rod:36\"  Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Winslow"},{"i":"wc2735","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Winslow, Brass","p":2794.66,"c":"Kitchen","s":"Kitchen Lighting","d":"Update your space with the clean, classic, early-electric look of the Winslow 8-light chandelier. A focal piece that's sure to be all the rage, this Winslow fixture easily jazzes up luxe industrial lifestyles. Winslow's clear seeded glass filters light beautifully and is removeable for ease of cleaning or replacement. Plus, its on-trend natural brass finish offers an exciting contrast to light walls and is easy to coordinate with other lighting, hardware, and plumbing fixtures. SKU:  6146226   Kichler#: 44035NBR   Width / Diameter:20.00\"   Height:14.75\"  Length:44.50\"  Weight:15.50 lb   Rod:36\"   Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Winslow"},{"i":"wc2736","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Winslow, Mat...","p":2794.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The modern Winslow 8 light chandelier in a Black finish with Clear Seeded glass shade pair beautifully with the linear arms, bringing light and dimension to a space. SKU:  6990463   Kichler#: 44035BK   Width / Diameter:19.90\"   Height:14.57\"  Length:44.20\"   Weight:15.72 lb   Rod:36\"  Wire:120\"  Canopy:6.00 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Winslow"},{"i":"wc2746","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Erzo, Stainless","p":3711.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 8 light chandelier in Satin Nickel finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments. SKU:  893350   Kichler#: 43857SN   Width / Diameter:35.50\"   Height:9.25\"  Weight:10.00 lb  Chain:36``  Rod:36\"  Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Stainless","f3l":"Style","f3v":"Erzo"},{"i":"wc2747","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Erzo, Brass","p":3711.66,"c":"Kitchen","s":"Kitchen Lighting","d":"The Erzo 9.25\" 8 light chandelier in Natural Brass finish features simple clean lines. The Erzo chandelier is perfect in contemporary or mid century modern environments SKU:  893358   Kichler#: 43857NBR   Width / Diameter:35.50\"   Height:9.25\"   Weight:10.00 lb   Chain:36``  Rod:36\"   Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Brass","f3l":"Style","f3v":"Erzo"},{"i":"wc2748","n":"KITCHEN LIGHTING - Chandeliers, Non-Existing, 8 Light, Erzo, Matte ...","p":3711.66,"c":"Kitchen","s":"Kitchen Lighting","d":"This 8 light chandelier in Black from the soft contemporary Erzo collection is ideal anywhere you want a modern touch. The simple, sleek lines create a stylish accent for your home. SKU:  6990167   Kichler#: 43857BK   Kichler  Width / Diameter:35.50\"  Height:9.25\"  Weight:10.00 lb  Chain:36``  Rod:36\"  Wire:156\"  Canopy:5.25 DIA","sup":"RL","f1l":"Type","f1v":"8 Light Chandelier - Non Existing","f2l":"Color","f2v":"Matte Black","f3l":"Style","f3v":"Erzo"},{"i":"wc2814","n":"KITCHEN CABINETS - 30 Inch, Aspen White","p":1463.22,"c":"Kitchen","s":"Cabinets","d":"ASPEN WHITE WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc2815","n":"KITCHEN CABINETS - 30 Inch, Shaker Navy Blue","p":1163.22,"c":"Kitchen","s":"Cabinets","d":"NAVY BLUE SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Shaker Navy Blue"},{"i":"wc2816","n":"KITCHEN CABINETS - 30 Inch, West Point Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WEST POINT GREY WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc2817","n":"KITCHEN CABINETS - 30 Inch, Winchester Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WINCHESTER GREY WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc2818","n":"KITCHEN CABINETS - 30 Inch, Russet Hickory","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"RUSSET HICKORY WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc2819","n":"KITCHEN CABINETS - 30 Inch, Hickory Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"HICKORY SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc2820","n":"KITCHEN CABINETS - 30 Inch, Florence Sage","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"FLORANCE SAGE WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc2821","n":"KITCHEN CABINETS - 30 Inch, Cambridge Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"CAMBRIDGE SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc2822","n":"KITCHEN CABINETS - 30 Inch, Summit White Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT WHITE SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc2823","n":"KITCHEN CABINETS - 30 Inch, Modern Black Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"MODERN BLACK SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc2824","n":"KITCHEN CABINETS - 30 Inch, Summit Platinum Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT PLATINUM SHAKER WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc2825","n":"KITCHEN CABINETS - 30 Inch, Cottage Creme","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"COTTAGE CREAME WITH 30 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc2842","n":"KITCHEN CABINETS - 36 Inch, Aspen White","p":1299.22,"c":"Kitchen","s":"Cabinets","d":"ASPEN WHITE WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc2843","n":"KITCHEN CABINETS - 36 Inch, Shaker Navy Blue","p":1301.22,"c":"Kitchen","s":"Cabinets","d":"NAVY BLUE SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Shaker Navy Blue - 36 Inch"},{"i":"wc2844","n":"KITCHEN CABINETS - 36 Inch, West Point Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WEST POINT GREY WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc2845","n":"KITCHEN CABINETS - 36 Inch, Winchester Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WINCHESTER GREY WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc2846","n":"KITCHEN CABINETS - 36 Inch, Russet Hickory","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"RUSSET HICKORY WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc2847","n":"KITCHEN CABINETS - 36 Inch, Hickory Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"HICKORY SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc2848","n":"KITCHEN CABINETS - 36 Inch, Florence Sage","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"FLORANCE SAGE WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc2849","n":"KITCHEN CABINETS - 36 Inch, Cambridge Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"CAMBRIDGE SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc2850","n":"KITCHEN CABINETS - 36 Inch, Summit White Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT WHITE SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc2851","n":"KITCHEN CABINETS - 36 Inch, Modern Black Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"MODERN BLACK SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc2852","n":"KITCHEN CABINETS - 36 Inch, Summit Platinum Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT PLATINUM SHAKER WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc2853","n":"KITCHEN CABINETS - 36 Inch, Cottage Creme","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"COTTAGE CREAME WITH 36 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc2870","n":"KITCHEN CABINETS - 42 Inch, Aspen White","p":1356.22,"c":"Kitchen","s":"Cabinets","d":"ASPEN WHITE WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc2871","n":"KITCHEN CABINETS - 42 Inch, Shaker Navy Blue","p":1356.22,"c":"Kitchen","s":"Cabinets","d":"NAVY BLUE SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Shaker Navy Blue - 42 Inch"},{"i":"wc2872","n":"KITCHEN CABINETS - 42 Inch, West Point Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WEST POINT GREY WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc2873","n":"KITCHEN CABINETS - 42 Inch, Winchester Grey","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"WINCHESTER GREY WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc2874","n":"KITCHEN CABINETS - 42 Inch, Russet Hickory","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"RUSSET HICKORY WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc2875","n":"KITCHEN CABINETS - 42 Inch, Hickory Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"HICKORY SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc2876","n":"KITCHEN CABINETS - 42 Inch, Florence Sage","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"FLORANCE SAGE WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc2877","n":"KITCHEN CABINETS - 42 Inch, Cambridge Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"CAMBRIDGE SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc2878","n":"KITCHEN CABINETS - 42 Inch, Summit White Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT WHITE SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc2879","n":"KITCHEN CABINETS - 42 Inch, Modern Black Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"MODERN BLACK SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc2880","n":"KITCHEN CABINETS - 42 Inch, Summit Platinum Shaker","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"SUMMIT PLATINUM SHAKER WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc2881","n":"KITCHEN CABINETS - 42 Inch, Cottage Creme","p":1536.22,"c":"Kitchen","s":"Cabinets","d":"COTTAGE CREAME WITH 42 in UPPERS. \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc2958","n":"CROWN MOULDING","p":126.0,"c":"Kitchen Extras","s":"Crown Molding","d":"Installing crown molding on cabinets"},{"i":"auto_installnonexistingpo_93450","n":"INSTALL NON EXISTING POT FILLER","p":1457.34,"c":"Kitchen Extras","s":"Plumbing Extras","d":"1. Run a cold supply to drop ear. **If there is no basement ceiling access or crawl space access then the added cost to install will be addressed by the install team**"},{"i":"auto_majorkitchenplumbing_89909","n":"MAJOR KITCHEN PLUMBING CHANGES.","p":5494.86,"c":"Kitchen Extras","s":"Plumbing Extras","d":"Moving plumbing for sink, dish washer."},{"i":"wc2964","n":"MOVE PLUGS OR ADD PLUGS","p":1850.0,"c":"Kitchen Extras","s":"Electrical Extras","d":"Move location of plugs.    **Moving more than a fe"},{"i":"auto_installnonexistingli_45424","n":"INSTALL NON EXISTING LIGHT","p":1554.54,"c":"Kitchen Extras","s":"Electrical Extras","d":"Running new electrical for new light fixtures. Moving lights."},{"i":"auto_move220vplug_37512","n":"Move 220V Plug","p":2436.0,"c":"Kitchen Extras","s":"Electrical Extras"},{"i":"wc2969","n":"KITCHEN FLOORING - Tile - Tile","p":95.45,"c":"Kitchen Extras","s":"Kitchen Flooring","d":"Tile flooring - PER SQUARE FT  - Demo old tile.  -","f1l":"Type","f1v":"Tile"},{"i":"wc2970","n":"KITCHEN FLOORING - LVP - LVP","p":20.97,"c":"Kitchen Extras","s":"Kitchen Flooring","d":"LVP FLOORING - PER SQUARE FOOT  Luxury LVP floorin","f1l":"Type","f1v":"LVP"},{"i":"wc2973","n":"EXHUAST HOOD VENTS - Hood Vent, Install New - Hood Vent, Install New","p":2427.58,"c":"Kitchen Extras","s":"Kitchen Items","d":"INSTALL A NEW HOOD VENT WHERE ALREADY EXISTING  1.","sup":"LOW","f1l":"Type","f1v":"Hood Vent","f2l":"Status","f2v":"Install New"},{"i":"wc2974","n":"EXHUAST HOOD VENTS - Hood Vent, Install Existing - Hood Vent, Insta...","p":4256.87,"c":"Kitchen Extras","s":"Kitchen Items","d":"INSTALL A NON EXISTING HOOD VENT  1. Run ductwork","sup":"LOW","f1l":"Type","f1v":"Hood Vent","f2l":"Status","f2v":"Install Existing"},{"i":"wc2975","n":"EXHUAST HOOD VENTS - Hood Vent, Uninstall/Reinstall - Hood Vent, Un...","p":349.84,"c":"Kitchen Extras","s":"Kitchen Items","d":"UNINSTALL/REINSTALL EXISTING HOOD VENT","sup":"LOW","f1l":"Type","f1v":"Hood Vent","f2l":"Status","f2v":"Uninstall/Reinstall - Hood Vent"},{"i":"auto_shoemoldinginstallat_44922","n":"Shoe molding installation","p":0,"c":"Kitchen Extras","s":"Kitchen Items"},{"i":"auto_newbaseboardinstalla_96521","n":"New Baseboard Installation","p":0,"c":"Kitchen Extras","s":"Kitchen Items"},{"i":"auto_addingstairnosing_22660","n":"Adding Stair Nosing","p":118.39,"c":"Kitchen Extras","s":"Kitchen Items","d":"Installation of one stair nosing on the top landing area of a stair way."},{"i":"auto_movefurniture_36233","n":"Move Furniture","p":0,"c":"Kitchen Extras","s":"Kitchen Items"},{"i":"auto_floorraising_59131","n":"Floor Raising","p":3.69,"c":"Kitchen Extras","s":"Kitchen Items","d":"Raising floor with osb.' Raise floor to match existing floor height."},{"i":"auto_fireplacetransition_06228","n":"FirePlace Transition","p":189.89,"c":"Kitchen Extras","s":"Kitchen Items","d":"Adding Fireplace Transitions. This price is for labor to install flooring transitions around one fireplace."},{"i":"auto_transitions_11478","n":"Transitions","p":118.69,"c":"Kitchen Extras","s":"Kitchen Items","d":"Flooring to moldings"},{"i":"auto_stairs_57465","n":"Stairs","p":237.44,"c":"Kitchen Extras","s":"Kitchen Items","d":"Install lvp on treads and risers, with color matched bullnose."},{"i":"auto_tileremoval_49668","n":"Tile Removal","p":16.92,"c":"Kitchen Extras","s":"Kitchen Items","d":"Tear out tile. \\n \\nDoes not include hauling away of debris. \\n \\n* Tearing out tile will change the height of the floor. There may be a gap at door jams and door casings. RenovationsNow is not responsible for fixing gaps from lowering the floor. This would be an extra cost to the customer."},{"i":"auto_floorprep_03321","n":"Floor Prep","p":0,"c":"Kitchen Extras","s":"Kitchen Items"},{"i":"auto_baseboardremoveandre_87612","n":"Baseboard REMOVE AND REINSTALL","p":2.21,"c":"Kitchen Extras","s":"Kitchen Items","d":"Removal and reinstallation of existing baseboard. \\n \\nRenovationsNow is not responsible for filling nail holes, caulking, or painting."},{"i":"auto_moveappliances_92977","n":"Move Appliances","p":35.59,"c":"Kitchen Extras","s":"Kitchen Items","d":"Move kitchen appliances \\n(Per appliance)"},{"i":"auto_demoofhardwoodfloori_81255","n":"Demo of Hard Wood Flooring","p":6.77,"c":"Kitchen Extras","s":"Kitchen Items","d":"Demo of hard wood flooring. \\n \\n* When removing hardwood, door jams and casing may have a gap at the bottom due to thickness difference between the old floor and the new lvp. Fixing the casing and door jams would be an extra cost to the customer."},{"i":"auto_demooflvpflooring_61217","n":"Demo of LVP Flooring","p":1.13,"c":"Kitchen Extras","s":"Kitchen Items","d":"Removal of LVP flooring. \\n \\nDoes not included hauling away of debris. \\n \\n* When removing laminate flooring, door jams and casing may have a gap at the bottom due to thickness difference between the old floor and the new lvp. Fixing the casing and door jams would be an extra cost to the customer."},{"i":"wc2977","n":"TILE BACKSPLASH","p":104.65,"c":"Kitchen Extras","s":"Backsplash","d":"INSTALL TILE BACKSPLASH - PER SQUARE FOOT    1.Dem","sup":"FD"},{"i":"wc2988","n":"SOFFIT REMOVAL (Ceiling is staying) **LINEAR FOOT PRICE**","p":221.33,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"**ADDITIONAL CHARGE WILL BE ADDED IT CONCRETE/LATH"},{"i":"wc2989","n":"SOFFIT REMOVAL ( with ceiling demo) **LINEAR FOOT PRICE**","p":111.21,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"1. Demo soffit.  2. Drywall.  3. Mud and paint."},{"i":"wc2990","n":"WALL DRYWALL REPLACEMENT.","p":41.22,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"**ADDITIONAL CHARGE WILL BE ADDED IT CONCRETE/LATH"},{"i":"wc2991","n":"DEMO FLOOR TILE AND RAISE FLOOR","p":78.74,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"DEMO FLOOR TILE.  DEMO SUB FLOOR.  INSTALL SUB FLO"},{"i":"wc2992","n":"CEILING DRYWALL REPLACEMENT","p":45.5,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"**ADDITIONAL CHARGE WILL BE ADDED IT CONCRETE/LATH"},{"i":"auto_repairsubfloorrotted_14317","n":"Repair Sub Floor (rotted out due to water damage) SQ FT","p":50.17,"c":"Kitchen Extras","s":"Kitchen Demo Extras","d":"Remove and haul out existing tile to expose rotten subfloor Replace subfloor with new OSB for increased structural integrity of floor before installing new flooring."},{"i":"wc2999","n":"BASES ONLY WITH COUNTER TOP - Aspen White - Aspen White","p":901.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Aspen White"},{"i":"wc3001","n":"BASES ONLY WITH COUNTER TOP - Navy Blue Shaker - Navy Blue Shaker","p":901.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Navy Blue Shaker"},{"i":"wc3002","n":"BASES ONLY WITH COUNTER TOP - West Point Grey","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"West Point Grey"},{"i":"wc3003","n":"BASES ONLY WITH COUNTER TOP - Winchester Grey","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Winchester Grey"},{"i":"wc3004","n":"BASES ONLY WITH COUNTER TOP - Russet Hickory","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Russet Hickory"},{"i":"wc3005","n":"BASES ONLY WITH COUNTER TOP - Hickory Shaker","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Hickory Shaker"},{"i":"wc3006","n":"BASES ONLY WITH COUNTER TOP - Florence Sage","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Florence Sage"},{"i":"wc3007","n":"BASES ONLY WITH COUNTER TOP - Cambridge Shaker","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Cambridge Shaker"},{"i":"wc3008","n":"BASES ONLY WITH COUNTER TOP - Summit White Shaker","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Summit White Shaker"},{"i":"wc3009","n":"BASES ONLY WITH COUNTER TOP - Modern Black Shaker","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Modern Black Shaker"},{"i":"wc3010","n":"BASES ONLY WITH COUNTER TOP - Summit Platinum Shaker","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Summit Platinum Shaker"},{"i":"wc3011","n":"BASES ONLY WITH COUNTER TOP - Cottage Creme","p":1010.22,"c":"Kitchen","s":"Cabinets with Countertops","d":"BASES WITH COUNTER TOP ONLY \\n1.Demo old countertop if existing. \\n2.Install base cabinets. \\n3.Install quartz counter top.","sup":"DSI","f1l":"Color","f1v":"Cottage Creme"},{"i":"wc3062","n":"LVP FLOOR COLORS - Price Choice, Light Oak","p":0.0,"c":"General","s":"Uncategorized","d":"LIGHT OAK  *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Price Choice","f2l":"Color","f2v":"Light Oak"},{"i":"wc3063","n":"LVP FLOOR COLORS - Price Choice, Medium Gray","p":0.0,"c":"General","s":"Uncategorized","d":"MEDIUM GRAY  *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Price Choice","f2l":"Color","f2v":"Medium Gray"},{"i":"HF30404-06","n":"LVP FLOOR COLORS - Classic LVP, Darby","p":0.0,"c":"General","s":"Uncategorized","d":"DARBY (HF30404-06) *Color may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Classic LVP","f2l":"Color","f2v":"Darby"},{"i":"HF30404-1","n":"LVP FLOOR COLORS - Classic LVP, Myrtle","p":0.0,"c":"General","s":"Uncategorized","d":"MYRTLE (HF30404-1) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Classic LVP","f2l":"Color","f2v":"Myrtle"},{"i":"HF30404-7","n":"LVP FLOOR COLORS - Classic LVP, Dresden","p":0.0,"c":"General","s":"Uncategorized","d":"DRESDEN (HF30404-7) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Classic LVP","f2l":"Color","f2v":"Dresden"},{"i":"HF30404-5","n":"LVP FLOOR COLORS - Classic LVP, Conway","p":0.0,"c":"General","s":"Uncategorized","d":"CONWAY (HF30404-5) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Classic LVP","f2l":"Color","f2v":"Conway"},{"i":"HF30404-2","n":"LVP FLOOR COLORS - Classic LVP, Laurens","p":0.0,"c":"General","s":"Uncategorized","d":"LAURENS (HF30404-2) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Classic LVP","f2l":"Color","f2v":"Laurens"},{"i":"PM-2152","n":"LVP FLOOR COLORS - Premium 7\" LVP, Harmon","p":0.0,"c":"General","s":"Uncategorized","d":"HARMON (PM-2152) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Premium 7\" LVP","f2l":"Color","f2v":"Harmon"},{"i":"PM-2153","n":"LVP FLOOR COLORS - Premium 7\" LVP, Kline","p":0.0,"c":"General","s":"Uncategorized","d":"KLINE (PM-2153) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Premium 7\" LVP","f2l":"Color","f2v":"Kline"},{"i":"PM-2154","n":"LVP FLOOR COLORS - Premium 7\" LVP, Franklin","p":0.0,"c":"General","s":"Uncategorized","d":"FRANKLIN (PM-2154) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Premium 7\" LVP","f2l":"Color","f2v":"Franklin"},{"i":"PM-2155","n":"LVP FLOOR COLORS - Premium 7\" LVP, Rawley","p":0.0,"c":"General","s":"Uncategorized","d":"RAWLEY (PM-2155) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Premium 7\" LVP","f2l":"Color","f2v":"Rawley"},{"i":"PM-2156","n":"LVP FLOOR COLORS - Premium 7\" LVP, Milam","p":0.0,"c":"General","s":"Uncategorized","d":"MILAM (PM-2156) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Premium 7\" LVP","f2l":"Color","f2v":"Milam"},{"i":"BRLR91RK01E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Studio Tan","p":0.0,"c":"General","s":"Uncategorized","d":"STUDIO TAN (BRLR91RK01E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Studio Tan"},{"i":"BRLR91RK02E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Sunbathe","p":0.0,"c":"General","s":"Uncategorized","d":"SUNBATHE (BRLR91RK02E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Sunbathe"},{"i":"BRLR91RK05E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Walk In Woods","p":0.0,"c":"General","s":"Uncategorized","d":"WALK IN WOODS (BRLR91RK05E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Walk In Woods"},{"i":"BRLR91RK03E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Artistic Inspiration","p":0.0,"c":"General","s":"Uncategorized","d":"ARTISTIC INSPIRATION (BRLR91RK03E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Artistic Inspiration"},{"i":"BRLR91RK06E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Treasured Rustic","p":0.0,"c":"General","s":"Uncategorized","d":"TREASURED RUSTIC (BRLR91RK06E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Treasured Rustic"},{"i":"BRLR91RK04E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Trail Ahead","p":0.0,"c":"General","s":"Uncategorized","d":"TRAIL AHEAD (BRLR91RK04E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Trail Ahead"},{"i":"BRLR91RK08E","n":"LVP FLOOR COLORS - Ultimate 9\" LVP, Cloudiness Gray","p":0.0,"c":"General","s":"Uncategorized","d":"CLOUDINESS GRAY (BRLR91RK08E) *Colors may vary from sample*","sup":"PLF","f1l":"Type","f1v":"Ultimate 9\" LVP","f2l":"Color","f2v":"Cloudiness Gray"},{"i":"wc3156","n":"LVP OR LVT FLOORING - LVP - LVP","p":24.97,"c":"Bathroom","s":"Bathroom Flooring","f1l":"Type","f1v":"LVP"},{"i":"wc3157","n":"LVP OR LVT FLOORING - LVT - LVT","p":24.97,"c":"Bathroom","s":"Bathroom Flooring","f1l":"Type","f1v":"LVT"},{"i":"wc3187","n":"KITCHEN FLOORING - LVT - LVT","p":20.97,"c":"Kitchen","s":"Kitchen Flooring","f1l":"Type","f1v":"LVT"},{"i":"wc3800","n":"KITCHEN SINK - 30 Inch, Single, Workstation, Stainless Steel","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3801","n":"KITCHEN SINK - 30 Inch, Single, Workstation, Brushed Gold","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3803","n":"KITCHEN SINK - 30 Inch, Single, Workstation, Copper","p":1006.5,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious 30\u2033 space-saving undermount singl","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Copper"},{"i":"wc3805","n":"KITCHEN SINK - 30 Inch, Single, Workstation, Matte Black","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious 30\u2033 space-saving undermount","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Matte Black"},{"i":"wc3816","n":"KITCHEN SINK - 30 Inch, Single, Traditional, Stainless Steel","p":719.0,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL 30 INCH Traditional sink.  Model:","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3817","n":"KITCHEN SINK - 30 Inch, Single, Traditional, Brushed Gold","p":805.28,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD 30 INCH Traditional sink.  Model: R28","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3819","n":"KITCHEN SINK - 30 Inch, Single, Traditional, Copper","p":805.28,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER 30 INCH Traditional sink.  Model: R28","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Copper"},{"i":"wc3821","n":"KITCHEN SINK - 30 Inch, Single, Traditional, Matte Black","p":805.28,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE 30 INCH Traditional sink.  Model: R28","f1l":"Size","f1v":"30 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Matte Black"},{"i":"wc3848","n":"KITCHEN SINK - 33 Inch, Single, Workstation, Stainless Steel","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Luxurious 33\u2033 space-saving undermo","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3849","n":"KITCHEN SINK - 33 Inch, Single, Workstation, Brushed Gold","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious 33\u2033 space-saving undermount","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3851","n":"KITCHEN SINK - 33 Inch, Single, Workstation, Copper","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious 33\u2033 space-saving undermount singl","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Copper"},{"i":"wc3853","n":"KITCHEN SINK - 33 Inch, Single, Workstation, Matte Black","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious 33\u2033 space-saving undermount","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Matte Black"},{"i":"wc3860","n":"KITCHEN SINK - 33 Inch, Single, Quartz, White","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"WHITE 32 inch quartz composite single bowl sink.","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"White"},{"i":"wc3861","n":"KITCHEN SINK - 33 Inch, Single, Quartz, Matte Black","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK 32 inch quartz composite single bowl s","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Matte Black"},{"i":"wc3862","n":"KITCHEN SINK - 33 Inch, Single, Quartz, Concrete Gray","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"CONCRETE GRAY 32 inch quartz composite single bowl","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Concrete Gray"},{"i":"wc3863","n":"KITCHEN SINK - 33 Inch, Single, Quartz, Beige","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"BEIGE 32 inch quartz composite single bowl sink.","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Beige"},{"i":"wc3864","n":"KITCHEN SINK - 33 Inch, Single, Traditional, Stainless Steel","p":575.2,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Traditional style stainless steel","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3865","n":"KITCHEN SINK - 33 Inch, Single, Traditional, Brushed Gold","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Traditional style stainless steel und","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3866","n":"KITCHEN SINK - 33 Inch, Single, Traditional, Brushed Black","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED BALCK Traditional style stainless steel un","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Brushed Black"},{"i":"wc3867","n":"KITCHEN SINK - 33 Inch, Single, Traditional, Copper","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Traditional style stainless steel undermoun","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Copper"},{"i":"wc3872","n":"KITCHEN SINK - 33 Inch, Double, Workstation, Stainless Steel","p":1020.98,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Luxurious space-saving undermount","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3873","n":"KITCHEN SINK - 33 Inch, Double, Workstation, Brushed Gold","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious space-saving undermount dou","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3875","n":"KITCHEN SINK - 33 Inch, Double, Workstation, Copper","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious space-saving undermount double bo","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Copper"},{"i":"wc3877","n":"KITCHEN SINK - 33 Inch, Double, Workstation, Matte Black","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious space-saving undermount doub","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Matte Black"},{"i":"wc3884","n":"KITCHEN SINK - 33 Inch, Double, Quartz, White","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"WHITE Quartz composite double bowl sink.  Model:","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"White"},{"i":"wc3885","n":"KITCHEN SINK - 33 Inch, Double, Quartz, Matte Black","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Quartz composite double bowl sink.  Mo","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Matte Black"},{"i":"wc3886","n":"KITCHEN SINK - 33 Inch, Double, Quartz, Concrete Gray","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"CONCRETE GRAY Quartz composite double bowl sink.","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Concrete Gray"},{"i":"wc3887","n":"KITCHEN SINK - 33 Inch, Double, Quartz, Beige","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"BEIGE Quartz composite double bowl sink.  Model:","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Beige"},{"i":"wc3888","n":"KITCHEN SINK - 33 Inch, Double, Traditional, Stainless Steel","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Luxurious undermount stainless ste","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3889","n":"KITCHEN SINK - 33 Inch, Double, Traditional, Brushed Gold","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious undermount stainless steel","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3891","n":"KITCHEN SINK - 33 Inch, Double, Traditional, Copper","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious undermount stainless steel double","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Copper"},{"i":"wc3893","n":"KITCHEN SINK - 33 Inch, Double, Traditional, Matte Black","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious undermount stainless steel d","f1l":"Size","f1v":"33 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Matte Black"},{"i":"wc3896","n":"KITCHEN SINK - 36 Inch, Single, Workstation, Stainless Steel","p":1006.6,"c":"Kitchen","s":"Kitchen Sinks","d":"Stainless steel Luxurious 36\u2033 space-saving undermo","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3897","n":"KITCHEN SINK - 36 Inch, Single, Workstation, Brushed Gold","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious 36\u2033 space-saving undermount","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3899","n":"KITCHEN SINK - 36 Inch, Single, Workstation, Copper","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious 36\u2033 space-saving undermount singl","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Workstation","f3l":"Color","f3v":"Copper"},{"i":"wc3908","n":"KITCHEN SINK - 36 Inch, Single, Quartz, White","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"WHITE 32 inch quartz composite single bowl sink.","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"White"},{"i":"wc3909","n":"KITCHEN SINK - 36 Inch, Single, Quartz, Matte Black","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK 32 inch quartz composite single bowl s","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Matte Black"},{"i":"wc3910","n":"KITCHEN SINK - 36 Inch, Single, Quartz, Concrete Gray","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"CONCRETE GRAY 32 inch quartz composite single bowl","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Concrete Gray"},{"i":"wc3911","n":"KITCHEN SINK - 36 Inch, Single, Quartz, Beige","p":862.8,"c":"Kitchen","s":"Kitchen Sinks","d":"BEIGE 32 inch quartz composite single bowl sink.","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Quartz","f3l":"Color","f3v":"Beige"},{"i":"wc3912","n":"KITCHEN SINK - 36 Inch, Single, Traditional, Stainless Steel","p":575.2,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Traditional style stainless steel","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3913","n":"KITCHEN SINK - 36 Inch, Single, Traditional, Brushed Gold","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Traditional style stainless steel und","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3914","n":"KITCHEN SINK - 36 Inch, Single, Traditional, Brushed Black","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED BALCK Traditional style stainless steel un","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Brushed Black"},{"i":"wc3915","n":"KITCHEN SINK - 36 Inch, Single, Traditional, Copper","p":661.48,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Traditional style stainless steel undermoun","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Traditional","f3l":"Color","f3v":"Copper"},{"i":"wc3920","n":"KITCHEN SINK - 36 Inch, Double, Workstation, Stainless Steel","p":1020.98,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Luxurious space-saving undermount","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3921","n":"KITCHEN SINK - 36 Inch, Double, Workstation, Brushed Gold","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious space-saving undermount dou","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3922","n":"KITCHEN SINK - 36 Inch, Double, Workstation, Brushed Black","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious space-saving undermount doub","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Brushed Black"},{"i":"wc3923","n":"KITCHEN SINK - 36 Inch, Double, Workstation, Copper","p":1150.4,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious space-saving undermount double bo","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Workstation","f3l":"Color","f3v":"Copper"},{"i":"wc3932","n":"KITCHEN SINK - 36 Inch, Double, Quartz, White","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"WHITE Quartz composite double bowl sink.  Model:","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"White"},{"i":"wc3933","n":"KITCHEN SINK - 36 Inch, Double, Quartz, Matte Black","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Quartz composite double bowl sink.  Mo","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Matte Black"},{"i":"wc3934","n":"KITCHEN SINK - 36 Inch, Double, Quartz, Concrete Gray","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"CONCRETE GRAY Quartz composite double bowl sink.","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Concrete Gray"},{"i":"wc3935","n":"KITCHEN SINK - 36 Inch, Double, Quartz, Beige","p":877.18,"c":"Kitchen","s":"Kitchen Sinks","d":"BEIGE Quartz composite double bowl sink.  Model:","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Quartz","f3l":"Color","f3v":"Beige"},{"i":"wc3936","n":"KITCHEN SINK - 36 Inch, Double, Traditional, Stainless Steel","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"STAINLESS STEEL Luxurious undermount stainless ste","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Stainless Steel"},{"i":"wc3937","n":"KITCHEN SINK - 36 Inch, Double, Traditional, Brushed Gold","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"BRUSHED GOLD Luxurious undermount stainless steel","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Brushed Gold"},{"i":"wc3939","n":"KITCHEN SINK - 36 Inch, Double, Traditional, Copper","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"COPPER Luxurious undermount stainless steel double","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Copper"},{"i":"wc3941","n":"KITCHEN SINK - 36 Inch, Double, Traditional, Matte Black","p":790.9,"c":"Kitchen","s":"Kitchen Sinks","d":"MATTE BLACK Luxurious undermount stainless steel d","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Double, Traditional","f3l":"Color","f3v":"Matte Black"},{"i":"wc3979","n":"KITCHEN SINK - 36 Inch, Single, Farm, White","p":4214.49,"c":"Kitchen","s":"Kitchen Sinks","d":"Whitehaven 35-11/16\" Self-Trimming Farmhouse Singl","f1l":"Size","f1v":"36 Inch","f2l":"Type","f2v":"Single, Farm","f3l":"Color","f3v":"White"},{"i":"wc4041","n":"KITCHEN PANTRY CABINETS - Pantry, Aspen White","p":1411.86,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Aspen White"},{"i":"wc4042","n":"KITCHEN PANTRY CABINETS - Pantry, Shaker Navy Blue","p":1411.86,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Shaker Navy Blue"},{"i":"wc4043","n":"KITCHEN PANTRY CABINETS - Pantry, West Point Grey","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"West Point Grey"},{"i":"wc4044","n":"KITCHEN PANTRY CABINETS - Pantry, Winchester Grey","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc4045","n":"KITCHEN PANTRY CABINETS - Pantry, Russet Hickory","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc4046","n":"KITCHEN PANTRY CABINETS - Pantry, Hickory Shaker","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc4047","n":"KITCHEN PANTRY CABINETS - Pantry, Florence Sage","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Florence Sage"},{"i":"wc4048","n":"KITCHEN PANTRY CABINETS - Pantry, Cambridge Shaker","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc4049","n":"KITCHEN PANTRY CABINETS - Pantry, Summit White Shaker","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc4050","n":"KITCHEN PANTRY CABINETS - Pantry, Modern Black Shaker","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc4051","n":"KITCHEN PANTRY CABINETS - Pantry, Summit Platinum Shaker","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc4052","n":"KITCHEN PANTRY CABINETS - Pantry, Cottage Creme","p":1584.84,"c":"Kitchen","s":"Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Pantry","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc4183","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Aspen White","p":1464.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"ASPEN WHITE BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc4184","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Shaker Navy Blue","p":1464.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"NAVY BLUE SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Shaker Navy Blue"},{"i":"wc4185","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, West Point Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WEST POINT GREY BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc4186","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Winchester Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WINCHESTER GREY BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc4187","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Russet Hickory","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"RUSSET HICKORY BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc4188","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Hickory Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"HICKORY SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc4189","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Florence Sage","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"FLORENCE SAGE BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc4190","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Cambridge Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"CAMBRIDGE SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc4191","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Summit White Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT WHITE SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc4192","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Modern Black Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"MODERN BLACK SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc4193","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Summit Platinum Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT PLATINUM SHAKER BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc4194","n":"KITCHEN CABINETS GLASS UPPERS - 30 Inch, Cottage Creme","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"COTTAGE CREME BASES WITH 30in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"30 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc4211","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Aspen White","p":1506.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"ASPEN WHITE BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc4212","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Shaker Navy Blue","p":1516.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"NAVY BLUE SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Shaker Navy Blue"},{"i":"wc4213","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, West Point Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WEST POINT GREY BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc4214","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Winchester Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WINCHESTER GREY BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc4215","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Russet Hickory","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"RUSSET HICKORY BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc4216","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Hickory Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"HICKORY SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc4217","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Florence Sage","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"FLORENCE SAGE BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc4218","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Cambridge Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"CAMBRIDGE SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc4219","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Summit White Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT WHITE SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc4220","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Modern Black Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"MODERN BLACK SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc4221","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Summit Platinum Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT PLATINUM SHAKER BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc4222","n":"KITCHEN CABINETS GLASS UPPERS - 36 Inch, Cottage Creme","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"COTTAGE CREME BASES WITH 36in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"36 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc4155","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Aspen White","p":1556.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"ASPEN WHITE BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Aspen White"},{"i":"wc4156","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Shaker Navy Blue","p":1556.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"NAVY BLUE SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Shaker Navy Blue"},{"i":"wc4157","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, West Point Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WEST POINT GREY BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"West Point Grey"},{"i":"wc4158","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Winchester Grey","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"WINCHESTER GREY BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Winchester Grey"},{"i":"wc4159","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Russet Hickory","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"RUSSET HICKORY BASES WITH 42in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Russet Hickory"},{"i":"wc4160","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Hickory Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"HICKORY SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Hickory Shaker"},{"i":"wc4161","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Florence Sage","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"FLORENCE SAGE BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Florence Sage"},{"i":"wc4162","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Cambridge Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"CAMBRIDGE SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Cambridge Shaker"},{"i":"wc4163","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Summit White Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT WHITE SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Summit White Shaker"},{"i":"wc4164","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Modern Black Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"MODERN BLACK SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Modern Black Shaker"},{"i":"wc4165","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Summit Platinum Shaker","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"SUMMIT PLATINUM SHAKER BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Summit Platinum Shaker"},{"i":"wc4166","n":"KITCHEN CABINETS GLASS UPPERS - 42 Inch, Cottage Creme","p":1881.22,"c":"Kitchen","s":"Glass Upper Cabinets","d":"COTTAGE CREME BASES WITH 42 in GLASS UPPERS \\n1. Demo cabinets and Counter top. \\n2. Install new bases, and uppers. \\n3. Install new cabinet hardware. \\n4. Install new counter top. \\n5. Install new sink and hook up to existing plumbing.","sup":"DSI","f1l":"Size","f1v":"42 Inch","f2l":"Color","f2v":"Cottage Creme"},{"i":"wc4422","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Aspen White","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Aspen White"},{"i":"wc4423","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Shaker Navy Blue","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc5995","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6001","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6055","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6061","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6067","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Florence Sage","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6073","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6079","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Summit White S...","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6085","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6091","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Summit Platinu...","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6097","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 84, Cottage Creme","p":2787.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4437","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Aspen White","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Aspen White"},{"i":"wc4438","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Shaker Navy Blue","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc5996","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6002","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6056","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6062","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6068","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Florence Sage","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6074","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6080","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Summit White S...","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6086","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6092","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Summit Platinu...","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6098","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 90, Cottage Creme","p":3198.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4452","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Aspen White","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Aspen White"},{"i":"wc4453","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Shaker Navy Blue","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc5997","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6003","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6057","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6063","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6069","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Florence Sage","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6075","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6081","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Summit White S...","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6087","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6093","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Summit Platinu...","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6099","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 30 x 96, Cottage Creme","p":3440.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4467","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Aspen White","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Aspen White"},{"i":"wc4468","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Shaker Navy Blue","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc5998","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6004","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6058","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6064","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6070","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Florence Sage","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6076","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6082","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Summit White S...","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6088","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6094","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Summit Platinu...","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6100","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 84, Cottage Creme","p":3179.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4482","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Aspen White","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Aspen White"},{"i":"wc4483","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Shaker Navy Blue","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc5999","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6005","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6059","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6065","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6071","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Florence Sage","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6077","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6083","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Summit White S...","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6089","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6095","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Summit Platinu...","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6101","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 90, Cottage Creme","p":3325.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4497","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Aspen White","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Aspen White"},{"i":"wc4498","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Shaker Navy Blue","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6000","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, West Point Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6006","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Winchester Grey","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6060","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Russet Hickory","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6066","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Hickory Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6072","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Florence Sage","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6078","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Cambridge Shaker","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6084","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Summit White S...","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6090","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Modern Black S...","p":4187.25,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6096","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Summit Platinu...","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6102","n":"KITCHEN OVEN PANTRY CABINETS - Single Oven, 33 x 96, Cottage Creme","p":3628.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Single Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4527","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Aspen White","p":5287.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Aspen White"},{"i":"wc4528","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Shaker Navy Blue","p":5287.08,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6103","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6109","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6115","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6121","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6127","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6133","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6139","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6145","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6151","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6157","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 84, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 84","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4542","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Aspen White","p":5698.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Aspen White"},{"i":"wc4543","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Shaker Navy Blue","p":5698.39,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6104","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6110","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6116","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6122","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6128","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6134","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6140","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6146","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6152","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6158","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 90, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 90","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4557","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Aspen White","p":5940.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Aspen White"},{"i":"wc4558","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Shaker Navy Blue","p":5940.59,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6105","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6111","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6117","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6123","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6129","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6135","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6141","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6147","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6153","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6159","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4572","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Aspen White","p":5679.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Aspen White"},{"i":"wc4573","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Shaker Navy Blue","p":5679.19,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6106","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6112","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6118","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6124","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6130","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6136","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 30 x 96, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"30 x 96","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6142","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6148","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6154","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6160","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 84, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 84","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4587","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Aspen White","p":5825.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Aspen White"},{"i":"wc4588","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Shaker Navy Blue","p":5825.24,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6107","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6113","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6119","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6125","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6131","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6137","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6143","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6149","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6155","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6161","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 90, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 90","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4602","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Aspen White","p":6128.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Aspen White"},{"i":"wc4603","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Shaker Navy Blue","p":6128.95,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Shaker Navy Blue"},{"i":"wc6108","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, West Point Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"West Point Grey"},{"i":"wc6114","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Winchester Grey","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Winchester Grey"},{"i":"wc6120","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Russet Hickory","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Russet Hickory"},{"i":"wc6126","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Hickory Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Hickory Shaker"},{"i":"wc6132","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Florence Sage","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Florence Sage"},{"i":"wc6138","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Cambridge Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Cambridge Shaker"},{"i":"wc6144","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Summit White Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Summit White S..."},{"i":"wc6150","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Modern Black Shaker","p":5715.86,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Modern Black S..."},{"i":"wc6156","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Summit Platinum Shaker","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Summit Platinu..."},{"i":"wc6162","n":"KITCHEN OVEN PANTRY CABINETS - Double Oven, 33 x 96, Cottage Creme","p":4643.91,"c":"Kitchen","s":"Oven Pantry Cabinets","sup":"DSI","f1l":"Type","f1v":"Double Oven","f2l":"Size","f2v":"33 x 96","f3l":"Color","f3v":"Cottage Creme"},{"i":"wc4968","n":"Kitchen Countertops - LAZA","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LAZA"},{"i":"wc4969","n":"Kitchen Countertops - SPARKELING WHITE","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKELING WHITE"},{"i":"wc4970","n":"Kitchen Countertops - ANTIQUE GOLD","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"ANTIQUE GOLD"},{"i":"wc4971","n":"Kitchen Countertops - CARRARA","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"CARRARA"},{"i":"wc4972","n":"Kitchen Countertops - LEARY GOLD","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LEARY GOLD"},{"i":"wc4973","n":"Kitchen Countertops - LEARY GREY","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"LEARY GREY"},{"i":"wc4974","n":"Kitchen Countertops - PURE WHITE","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"PURE WHITE"},{"i":"wc4975","n":"Kitchen Countertops - RIVER BLACK","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"RIVER BLACK"},{"i":"wc4976","n":"Kitchen Countertops - SKY BLUE","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SKY BLUE"},{"i":"wc4977","n":"Kitchen Countertops - SPARKLING BLACK","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKLING BLACK"},{"i":"wc4978","n":"Kitchen Countertops - SPARKLING MONT","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SPARKLING MONT"},{"i":"wc4979","n":"Kitchen Countertops - SUN GREY","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"SUN GREY"},{"i":"wc4980","n":"Kitchen Countertops - VADARA","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"VADARA"},{"i":"wc4981","n":"Kitchen Countertops - VENETIAN GREY","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"VENETIAN GREY"},{"i":"wc4982","n":"Kitchen Countertops - MARMI","p":0.0,"c":"Kitchen","s":"Countertops","d":"QUARTZ VANITY TOP. VEINING MAY VARY.","sup":"AG","f1l":"Color","f1v":"MARMI"},{"i":"auto_kitchencountertopscu_57693","n":"Kitchen Countertops - Customer Select","p":0.0,"c":"Kitchen","s":"Countertops","sup":"AG","f1l":"Color","f1v":"Customer Select"},{"i":"roof_pkg_economy","n":"Roof Package - Economy Package","p":742.53,"c":"Roofing","s":"Roof Packages","d":"Economy roofing package - price per square","sup":"","itemType":"Material"},{"i":"roof_pkg_signature","n":"Roof Package - RN Signature Package","p":1049.46,"c":"Roofing","s":"Roof Packages","d":"RN Signature roofing package - price per square","sup":"","itemType":"Material"},{"i":"roof_pkg_platinum","n":"Roof Package - Signature Plus Platinum Package","p":1334.52,"c":"Roofing","s":"Roof Packages","d":"Signature Plus Platinum roofing package - price per square","sup":"","itemType":"Material"},{"i":"roof_und_ice","n":"Roof Underlayment - Full Ice and Water Guard","p":59,"c":"Roofing","s":"Underlayment","d":"Full ice and water guard - price per square","sup":"","itemType":"Material"},{"i":"roof_und_lowslope","n":"Roof Underlayment - Low Slope Roof (2/12 through 3/12 pitch) with Shingles","p":59,"c":"Roofing","s":"Underlayment","d":"Low slope roof 2/12 through 3/12 pitch with shingles - price per square","sup":"","itemType":"Material"},{"i":"roof_sh_uhdz","n":"Roof Shingles - UHDZ Shingle Upgrade","p":38,"c":"Roofing","s":"Shingle Upgrades","d":"UHDZ shingle upgrade - price per square","sup":"","itemType":"Material"},{"i":"roof_sh_hdz","n":"Roof Shingles - HDZ Shingle Upgrade","p":101.53,"c":"Roofing","s":"Shingle Upgrades","d":"HDZ shingle upgrade - price per square","sup":"","itemType":"Material"},{"i":"roof_vent_solar","n":"Roof Ventilation - Roof Vents (Solar Power)","p":894.43,"c":"Roofing","s":"Ventilation","d":"Solar powered roof vent - price each","sup":"","itemType":"Product"},{"i":"roof_vent_damper","n":"Roof Ventilation - New Damper Vent Hose","p":114.13,"c":"Roofing","s":"Ventilation","d":"New damper vent hose","sup":"","itemType":"Product"},{"i":"roof_gut_5","n":"Roof Gutters - 5 Inch Gutters","p":11.02,"c":"Roofing","s":"Gutters","d":"5 inch gutters - price per linear foot","sup":"","itemType":"Material"},{"i":"roof_gut_5g","n":"Roof Gutters - 5 Inch Gutter Guards","p":11.02,"c":"Roofing","s":"Gutters","d":"5 inch gutter guards - price per linear foot","sup":"","itemType":"Material"},{"i":"roof_gut_6","n":"Roof Gutters - 6 Inch Gutters","p":18.52,"c":"Roofing","s":"Gutters","d":"6 inch gutters - price per linear foot","sup":"","itemType":"Material"},{"i":"roof_gut_6g","n":"Roof Gutters - 6 Inch Gutter Guards","p":18.52,"c":"Roofing","s":"Gutters","d":"6 inch gutter guards - price per linear foot","sup":"","itemType":"Material"},{"i":"roof_flat_liberty","n":"Roof Flat - Liberty Peel and Stick","p":819.52,"c":"Roofing","s":"Flat Roofing","d":"Liberty peel and stick flat roofing - price per square","sup":"","itemType":"Material"},{"i":"roof_flat_epdm","n":"Roof Flat - EPDM","p":1551.23,"c":"Roofing","s":"Flat Roofing","d":"EPDM flat roofing - price per square","sup":"","itemType":"Material"},{"i":"roof_misc_osb_sheet","n":"Roof Misc - OSB - Per Sheet","p":130,"c":"Roofing Extras","s":"Miscellaneous","d":"OSB per sheet","sup":"","itemType":"Material"},{"i":"roof_misc_osb_redeck","n":"Roof Misc - OSB - Full Re-Deck","p":321,"c":"Roofing Extras","s":"Miscellaneous","d":"OSB full re-deck - price per square","sup":"","itemType":"Material"},{"i":"roof_misc_addlayers","n":"Roof Misc - Additional Layers","p":28.76,"c":"Roofing Extras","s":"Miscellaneous","d":"Additional layers - price per square","sup":"","itemType":"Material"},{"i":"roof_misc_steep8","n":"Roof Misc - Steep Pitch 8/12 to 10/12","p":57.52,"c":"Roofing Extras","s":"Miscellaneous","d":"Steep pitch 8/12 to 10/12 - price per square","sup":"","itemType":"Material"},{"i":"roof_misc_steep11","n":"Roof Misc - Steep Pitch 11/12 to 12/12","p":115.04,"c":"Roofing Extras","s":"Miscellaneous","d":"Steep pitch 11/12 to 12/12 - price per square","sup":"","itemType":"Material"},{"i":"roof_misc_winflash","n":"Roof Misc - Roof Mounted Windows Flashing Kit","p":751,"c":"Roofing Extras","s":"Miscellaneous","d":"Roof mounted windows flashing kit","sup":"","itemType":"Material"},{"i":"roof_misc_win2424","n":"Roof Misc - Roof Mounted Windows 24x24","p":2142,"c":"Roofing Extras","s":"Miscellaneous","d":"Roof mounted windows 24x24","sup":"","itemType":"Product"},{"i":"roof_misc_win2448","n":"Roof Misc - Roof Mounted Windows 24x48","p":2142,"c":"Roofing Extras","s":"Miscellaneous","d":"Roof mounted windows 24x48","sup":"","itemType":"Product"},{"i":"roof_misc_wincustom","n":"Roof Misc - Roof Mounted Windows Custom","p":3641,"c":"Roofing Extras","s":"Miscellaneous","d":"Roof mounted windows custom size","sup":"","itemType":"Product"},{"i":"roof_misc_rafter","n":"Roof Misc - Rafter Replacement","p":1051.26,"c":"Roofing Extras","s":"Miscellaneous","d":"Rafter replacement","sup":"","itemType":"Material"},{"i":"roof_misc_cleanup","n":"Roof Misc - Clean Up Fee","p":626.52,"c":"Roofing Extras","s":"Miscellaneous","d":"Clean up fee","sup":"","itemType":"Material"}];

/* Normalize into {id, name, price, cat, sub, desc} */
const ALL_PRODUCTS = RAW_PRODUCTS.map(p => ({id:p.i, name:p.n, price:p.p||0, cost:p.cost||0, itemType:p.itemType||"Product", cat:p.c||"General", sub:p.s||"", desc:p.d||"", sup:p.sup||"", f1l:p.f1l||"", f1v:p.f1v||"", f2l:p.f2l||"", f2v:p.f2v||"", f3l:p.f3l||"", f3v:p.f3v||""}));

/* Supplier code → full name mapping */
const SUPPLIER_MAP = {"DSI":"DSI","ETNA":"ETNA","RL":"Rays Lighting","PLF":"Pleasant Flooring","AMZ":"Amazon","AG":"American Granite","LOW":"Lowes","FD":"Floor Decor","FERG":"Ferguson","SW":"Sherwin"};
const SUPPLIER_LIST = ["DSI","ETNA","Amazon","Rays Lighting","American Granite","Lowes","Pleasant Flooring","Floor Decor","Ferguson","Sherwin","Other Suppliers"];
const mapSupplier = (code) => SUPPLIER_MAP[code] || code || "Other Suppliers";

/* ─── ICONS ─── */
const I = ({name,size=16}) => {
  const p = {
    plus:<path d="M12 5v14M5 12h14"/>,
    trash:<><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></>,
    check:<path d="M20 6L9 17l-5-5"/>,
    chevR:<path d="M9 18l6-6-6-6"/>,
    file:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    package:<><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></>,
    users:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    home:<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>,
    clipboard:<><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    arrowL:<><path d="M19 12H5M12 19l-7-7 7-7"/></>,
    percent:<><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    zap:<path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    checkCircle:<><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    alertTri:<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    skip:<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    search:<><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
    menu:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
};

const fmt = n => "$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const gid = () => Math.random().toString(36).substr(2,9);

/* ─── WIZARD DEFINITIONS ─── */
const BRANDS = ["Monterey","Luxura","Durasein"];
const BATH_SIZES = ["36x36 Shower","48x36 Shower","60x36 Shower","60x48 Shower","60x60 Shower","60x36 Bathtub"];
const VAN_TYPES = ["Single","Double"];
const KIT_SIZES = ["30 Inch Sink Base","33 Inch Sink Base","36 Inch Sink Base"];
const DISC_PRESETS = [
  {id:"d_social",name:"Social Media",type:"flat",amount:600},
  {id:"d_video",name:"Video Testimonial",type:"flat",amount:1200},
  {id:"d_yard_side",name:"Yard Sign Side Street",type:"flat",amount:450},
  {id:"d_yard_main",name:"Yard Sign Main Rd",type:"flat",amount:900},
  {id:"d_veteran",name:"Veteran",type:"flat",amount:1000},
  {id:"d_cash",name:"Cash Discount",type:"flat",amount:750},
  {id:"d_tv",name:"TV Discount",type:"flat",amount:2500},
  {id:"d_first",name:"First Visit Offer",type:"percent",amount:10},
  {id:"d_first5",name:"First Visit Offer 5%",type:"percent",amount:5},
  {id:"d_ff",name:"Friends and Family",type:"percent",amount:25},
  {id:"d_ff10",name:"Friends and Family 10 Year",type:"percent",amount:23.875},
  {id:"d_ff15",name:"Friends and Family 15 Year",type:"percent",amount:22},
  {id:"d_ff1",name:"Friends and Family 1 Year Same As Cash",type:"percent",amount:19.75},
];

/* ─── BASE PRICES by build config ─── */
const BASE_PRICES = {
  // Full Bath - Double Vanity
  "36x36 Shower|Double|Luxura":30118.97,"48x36 Shower|Double|Luxura":30734.88,"60x36 Bathtub|Double|Luxura":31353.56,"60x36 Shower|Double|Luxura":31353.56,"60x48 Shower|Double|Luxura":33132.08,"60x60 Shower|Double|Luxura":33303.56,
  "36x36 Shower|Double|Monterey":30118.97,"48x36 Shower|Double|Monterey":30734.88,"60x36 Bathtub|Double|Monterey":31353.56,"60x36 Shower|Double|Monterey":31353.56,"60x48 Shower|Double|Monterey":33132.08,"60x60 Shower|Double|Monterey":33303.56,
  "36x36 Shower|Double|Durasein":30118.97,"48x36 Shower|Double|Durasein":30734.88,"60x36 Bathtub|Double|Durasein":31353.56,"60x36 Shower|Double|Durasein":31353.56,"60x48 Shower|Double|Durasein":33132.08,"60x60 Shower|Double|Durasein":33303.56,
  // Full Bath - Single Vanity
  "36x36 Shower|Single|Luxura":28973.47,"48x36 Shower|Single|Luxura":29589.38,"60x36 Bathtub|Single|Luxura":30208.06,"60x36 Shower|Single|Luxura":30208.06,"60x48 Shower|Single|Luxura":31986.58,"60x60 Shower|Single|Luxura":32158.06,
  "36x36 Shower|Single|Monterey":28973.47,"48x36 Shower|Single|Monterey":29589.38,"60x36 Bathtub|Single|Monterey":30208.06,"60x36 Shower|Single|Monterey":30208.06,"60x48 Shower|Single|Monterey":31986.58,"60x60 Shower|Single|Monterey":32158.06,
  "36x36 Shower|Single|Durasein":28973.47,"48x36 Shower|Single|Durasein":29589.38,"60x36 Bathtub|Single|Durasein":30208.06,"60x36 Shower|Single|Durasein":30208.06,"60x48 Shower|Single|Durasein":31986.58,"60x60 Shower|Single|Durasein":32158.06,
  // Wet Area Only (shower only / bathtub only)
  "36x36 Shower|wet|Luxura":21113.84,"48x36 Shower|wet|Luxura":21529.61,"60x36 Bathtub|wet|Luxura":21629.44,"60x36 Shower|wet|Luxura":21629.44,"60x48 Shower|wet|Luxura":21763.61,"60x60 Shower|wet|Luxura":22902.32,
  "36x36 Shower|wet|Monterey":21113.84,"48x36 Shower|wet|Monterey":21529.61,"60x36 Bathtub|wet|Monterey":21629.44,"60x36 Shower|wet|Monterey":21629.44,"60x48 Shower|wet|Monterey":21763.61,"60x60 Shower|wet|Monterey":22902.32,
  "36x36 Shower|wet|Durasein":21113.84,"48x36 Shower|wet|Durasein":21529.61,"60x36 Bathtub|wet|Durasein":21629.44,"60x36 Shower|wet|Durasein":21629.44,"60x48 Shower|wet|Durasein":21763.61,"60x60 Shower|wet|Durasein":22902.32,
  // Kitchen
  "kitchen":4570.36,
  // Half Bath
  "half_bath":12500.00,
};

const getBasePrice = (buildType, config, overrides) => {
  const ov = overrides || {};
  let key;
  if (buildType.includes("Kitchen")) key = "kitchen";
  else if (buildType.includes("Half Bath")) key = "half_bath";
  else if (buildType.includes("Roofing")) key = "roofing";
  else if (buildType.includes("Wet")) key = (config.size||"")+"|wet|"+(config.brand||"");
  else key = (config.size||"")+"|"+(config.vanityType||"")+"|"+(config.brand||"");
  if (ov[key] !== undefined) return ov[key];
  return BASE_PRICES[key] || 0;
};

/* ─── STATEMENT OF WORK VERBIAGE ─── */
const SOW = {
"Full Bathroom Remodel": {
  title: "Statement of Work",
  guarantee: "LIFETIME GUARANTEE AGAINST DEFECTS IN MATERIALS AND LABOR",
  steps: [
    "Demo shower or bath tub to studs. (only place coming down to studs).",
    "Remove vanity.",
    "Remove toilet.",
    "Remove Light fixtures.",
    "Remove Mirror.",
    "Remove towel bars.",
    "Install new shower pan (solid surface) or bathtub (acrylic).",
    "Install new drywall behind shower or bath.",
    "Install new shower diverter.",
    "Install water proof corners.",
    "Install NOWSTONE in shower.",
    "Install shower door.",
    "Install shower diverter trims.",
    "Install shower niche. 34x14 or 14x14",
    "Minor drywall repair.",
    "Paint walls and ceiling.",
    "Install new vanity.",
    "Install new mirror.",
    "Install new light fixture.",
    "Install new towel bars.",
    "Install new pvc trim. (Caulked and painted.)",
    "Install lvt or lvp flooring over existing tile. (Removal of tile will be an added cost)",
  ],
  disclaimers: [
    "All demo removed from property with a dumpster. Dumpster will be on property until end of the project.",
    "Final payment must be made when all work aside from shower door installation is complete. Customer can withhold $1500 from payment until final glass installation.",
    "This estimate does not include moving or updating of electrical or plumbing beyond the scope of the original contract. Any moving or updating beyond the original scope will be an extra cost added as a change order.",
    "All materials are budgeted by RenovationsNow. Any overage from budget will be added to second payment made.",
    "No verbal contracts or promises will be honored, all work to be performed must be on this contract.",
  ],
  tileNote: "Bathroom Tile Flooring: 12X24 OR EQUIVALENT SQUARE FOOT SIZE ONLY. LARGER OR SMALLER TILES WILL BE AN ADDED COST. TILE BUDGET IS 6 DOLLARS A SQUARE FOOT. FLOOR AND DECOR TILE ONLY. NO VERTICAL PATTERNS OR HERRINGBONE.",
},
"Wet Area Only": {
  title: "Statement of Work",
  guarantee: "LIFETIME GUARANTEE AGAINST DEFECTS IN MATERIALS AND LABOR",
  steps: [
    "DEMO OLD SHOWER.",
    "DEMO OLD SHOWER SURROUND.",
    "REMOVE AND REPLACE SHOWER FIXTURES.",
    "INSTALL NEW SHOWER PAN.",
    "INSTALL NEW DRYWALL IN SHOWER SURROUND.",
    "INSTALL INSIDE CORNER WATER PROOFING MEMBRANE.",
    "INSTALL NEW NOWSTONE LUXURA SHOWER PANELS.",
    "INSTALL NICHE. 34x14",
    "INSTALL SHOWER DOORS. (EYE DROP BY PASS)",
  ],
  disclaimers: [
    "All demo removed from property with a dumpster. Dumpster will be on property until end of the project.",
    "This estimate does not include painting inside of bathroom. Painting will be an additional cost, if desired.",
    "Final payment must be made when all work aside from shower door installation is complete. Customer can withhold $1500 from payment until final glass installation.",
    "This estimate does not include moving or updating of electrical or plumbing beyond the scope of the original contract. Any moving or updating beyond the original scope will be an extra cost added as a change order.",
    "All materials are budgeted by RenovationsNow. Any overage from budget will be added to second payment made.",
    "No verbal contracts or promises will be honored, all work to be performed must be on this contract.",
  ],
  tileNote: "Bathroom Tile Flooring: 12X24 OR EQUIVALENT SQUARE FOOT SIZE ONLY. LARGER OR SMALLER TILES WILL BE AN ADDED COST. TILE BUDGET IS 6 DOLLARS A SQUARE FOOT. FLOOR AND DECOR TILE ONLY. NO VERTICAL PATTERNS OR HERRINGBONE.",
},
"Kitchen Remodel": {
  title: "Statement of Work",
  guarantee: "LIFETIME GUARANTEE AGAINST DEFECTIVE MATERIAL OR WORKMANSHIP",
  steps: [
    "FINAL MEASUREMENT",
    "PROJECT MAP",
    "CREATE SEPARATE MATERIAL LISTS FOR INDIVIDUAL VENDORS",
    "FINAL CABINET DESIGN",
    "LOGISTICAL PLANNING",
    "TAKE DELIVERY ON SITE AND INSPECT MATERIALS",
    "HAUL AWAY AND DISPOSE OF WASTE",
  ],
  prepwork: [
    "SET RAMBOARD TO PROTECT HARD FLOORS",
    "SET CARPET SAVER TO PROTECT CARPET",
    "INSTALL TEMPORARY PLASTIC WALLS AS NEEDED TO CONTAIN DUST",
  ],
  disclaimers: [
    "All demo removed from property with a dumpster. Dumpster will be on property until end of the project.",
    "This estimate does not include moving or updating of electrical or plumbing beyond the scope of the original contract. Any moving or updating beyond the original scope will be an extra cost added as a change order.",
    "All materials are budgeted by RenovationsNow. Any overage from budget will be added to second payment made.",
    "No verbal contracts or promises will be honored, all work to be performed must be on this contract.",
  ],
  tileNote: "Tile sheets only 12x12 mosaic or subway tile 3x12. Customer must pick out tile from Floor and Decor. Budget for tile is 14 dollars a square foot.",
},
"Roofing": {
  title: "Statement of Work",
  guarantee: "LIFETIME GUARANTEE AGAINST DEFECTIVE MATERIAL OR WORKMANSHIP",
  steps: [
    "Complete roof inspection and measurement.",
    "Remove existing roofing materials down to deck.",
    "Inspect and repair roof deck as needed.",
    "Install ice and water shield underlayment.",
    "Install synthetic underlayment.",
    "Install new drip edge flashing.",
    "Install new step and counter flashing.",
    "Install new shingles per manufacturer specifications.",
    "Install ridge vent and roof ventilation.",
    "Install new pipe boots and penetration flashing.",
    "Complete cleanup and haul away all debris.",
    "Final inspection and walkthrough with homeowner.",
  ],
  disclaimers: [
    "All debris removed from property with a dumpster. Dumpster will be on property until end of the project.",
    "This estimate does not include structural repairs beyond the scope of the original contract. Any additional repairs will be an extra cost added as a change order.",
    "All materials are budgeted by RenovationsNow. Any overage from budget will be added to second payment made.",
    "No verbal contracts or promises will be honored, all work to be performed must be on this contract.",
  ],
  tileNote: "",
},
"Half Bath": {
  title: "Statement of Work",
  guarantee: "LIFETIME GUARANTEE AGAINST DEFECTS IN MATERIALS AND LABOR",
  steps: [
    "Remove existing vanity, mirror, lighting, and toilet.",
    "Install new vanity and vanity top.",
    "Install new vanity faucet and connect to existing plumbing.",
    "Install new vanity mirror and medicine cabinet.",
    "Install new lighting fixture.",
    "Install new toilet and connect to existing plumbing.",
    "Install new LVP or LVT flooring.",
    "Install new baseboard and trim.",
    "Complete cleanup and final walkthrough with homeowner.",
  ],
  disclaimers: [
    "All debris removed from the bathroom.",
    "This estimate does not include any plumbing changes, electrical changes, drywall work, or painting unless specifically listed as an extra.",
    "All materials are budgeted by RenovationsNow. Any overage from budget will be added to second payment made.",
    "No verbal contracts or promises will be honored, all work to be performed must be on this contract.",
  ],
  tileNote: "",
},
};

/* ─── PRICEBOOK CATEGORIES ─── */
const PB_CATS = {
  "Bathroom": [
    {key:"shower_wall",label:"Shower Walls",pfx:["Luxura Nowstone","Monterey Velvet","Monterey Subway","Durasein"]},
    {key:"vanity",label:"Vanities",pfx:["Vanities"]},
    {key:"wall_vanity",label:"Wall to Wall Vanities",pfx:["Wall To Wall Vanities"]},
    {key:"tops",label:"Vanity Tops",pfx:["Tops"]},
    {key:"vanity_faucet",label:"Vanity Faucets",pfx:["Vanity Faucets"]},
    {key:"shower_pan",label:"Shower Pans",pfx:["Shower Pan"]},
    {key:"bathtub",label:"Bathtub",pfx:["Bathtubs"]},
    {key:"shower_trim",label:"Shower Trim Kits",pfx:["Shower Diverter Trim Kits"]},
    {key:"bathtub_trim",label:"Bathtub Trim Kits",pfx:["Bathtub Diverter Trim Kits"]},
    {key:"towel_bar",label:"Towel Bar Kits",pfx:["Towel Bar Kit"]},
    {key:"mirror",label:"Vanity Mirrors",pfx:["Vanity Mirror"]},
    {key:"medicine_cab",label:"Medicine Cabinets",pfx:["Medicine Cabinets"]},
    {key:"shower_doors",label:"Shower Doors",pfx:["Shower Doors"]},
    {key:"bathtub_doors",label:"Bathtub Doors",pfx:["Bathtub Doors"]},
    {key:"lighting",label:"Lighting",pfx:["Lighting"]},
    {key:"grab_bars",label:"Grab Bars",pfx:["Grab Bars"]},
    {key:"freestanding_tub",label:"Freestanding Tubs",pfx:["Free Standing Tub"]},
    {key:"tub_filler",label:"Tub Fillers",pfx:["Free Standing Tub Fillers"]},
    {key:"toilet",label:"Toilets",pfx:["Toilets"]},
    {key:"shower_bench",label:"Shower Benches",pfx:["Flip Up Shower Bench"]},
    {key:"foot_rest",label:"Wall Mounted Foot Rests",pfx:["Wall Mounted Foot Rest"]},
    {key:"niche",label:"Nowstone Niches",pfx:["Nowstone Niche"]},
    {key:"bath_flooring",label:"Bathroom Flooring",pfx:["LVP OR LVT FLOORING","Luxury Vinyl Tile","Luxury Vinyl Flooring","LVP FLOOR COLORS"]},
    {key:"go_board",label:"Go Board",pfx:["Go Board"]},
    {key:"half_bath",label:"Half Bath",pfx:["Half Bath"]},
  ],
  "Kitchen": [
    {key:"kitchen_cab",label:"Cabinets",pfx:["KITCHEN CABINETS"]},
    {key:"kitchen_glass",label:"Glass Upper Cabinets",pfx:["KITCHEN CABINETS GLASS UPPERS"]},
    {key:"kitchen_cab_ct",label:"Cabinets with Countertop",pfx:["BASES ONLY WITH COUNTER TOP"]},
    {key:"kitchen_ct",label:"Countertops",pfx:["Kitchen Countertops"]},
    {key:"kitchen_pantry",label:"Pantry Cabinets",pfx:["KITCHEN PANTRY CABINETS"]},
    {key:"kitchen_oven",label:"Oven Pantry Cabinets",pfx:["KITCHEN OVEN PANTRY CABINETS"]},
    {key:"kitchen_floor",label:"Kitchen Flooring",pfx:["KITCHEN FLOORING"]},
    {key:"kitchen_floor_color",label:"Flooring Colors",pfx:["LVP FLOOR COLORS","CARPET COLORS"]},
    {key:"pot_filler",label:"Pot Fillers",pfx:["POT FILLERS"]},
    {key:"glass_rinser",label:"Glass Rinsers",pfx:["GLASS RINSER"]},
    {key:"soap_disp",label:"Soap Dispensers",pfx:["SOAP DISPENSER"]},
    {key:"bev_faucet",label:"Beverage Faucets",pfx:["BEVERAGE FAUCET"]},
    {key:"hood_vent",label:"Hood Vents",pfx:["HOOD VENTS","EXHUAST HOOD VENTS"]},
    {key:"kitchen_light",label:"Kitchen Lighting",pfx:["KITCHEN LIGHTING"]},
    {key:"kitchen_sink",label:"Kitchen Sinks",pfx:["KITCHEN SINK","SINGLE BOWL SINKS","WORK STATIONS","36 INCH BASE DOUBLE SINK"]},
    {key:"kitchen_faucet",label:"Sink Faucets",pfx:["KITCHEN SINK FAUCETS"]},
    {key:"cabinet_extras",label:"Cabinet Extras",pfx:["CABINET EXTRAS"]},
    {key:"under_cab_light",label:"Under Cabinet Lighting",pfx:["UNDER CABINET"]},
  ],
  "Roofing": [
    {key:"roof_package",label:"Roof Packages",pfx:["Roof Package"]},
    {key:"roof_shingles",label:"Shingle Upgrades",pfx:["Roof Shingles"]},
    {key:"roof_underlayment",label:"Underlayment",pfx:["Roof Underlayment"]},
    {key:"roof_ventilation",label:"Ventilation",pfx:["Roof Ventilation"]},
    {key:"roof_gutters",label:"Gutters",pfx:["Roof Gutters"]},
    {key:"roof_flat",label:"Flat Roofing",pfx:["Roof Flat"]},
    {key:"roof_misc",label:"Miscellaneous",pfx:["Roof Misc"]},
  ],
  "Bathroom Extras": [
    {key:"ext_bath_shower",label:"Shower Only",pfx:["REPLACE TOILET","REPLACE VANITY LIGHT","REPLACE MIRROR","REPLACE VANITY FAUCET","PAINT BATHROOM","REPLACE VANITY","Special Order Material","RAISING DOOR THRESHOLD"]},
    {key:"ext_bath_demo",label:"Demo Extras",pfx:["WALL DRYWALL REPLACEMENT","DEMO FLOOR TILE","CEILING DRYWALL","SOFFIT REMOVAL (Ceiling is staying)","SOFFIT REMOVAL ( with ceiling demo)","DEMOING A JAQUZZI","Repair Sub Floor"]},
    {key:"ext_bath_electrical",label:"Electrical Extras",pfx:["INSTALLING A LIGHTED MIRROR","INSTALL NON EXISTING VANITY LIGHT","MOVE VANITY LIGHT","INSTALL 20 AMP"]},
    {key:"ext_bath_framing",label:"Framing Extras",pfx:["ADDING A CLOSET","EXPANDING OF BATHROOM","INSTALLING NEW PRE HUNG","FLOOR RASING","SUBFLOOR REPLACEMENT","CUTTING SHOWER WALL"]},
    {key:"ext_bath_plumbing",label:"Plumbing Extras",pfx:["MOVING SINGLE VANITY","MOVING DOUBLE VANITY","MAJOR PLUMBING","ADDITIONAL SHOWER DIVERTER","NON EXISTING SHOWER ADD","FREE STANDING TUB REPLACE","CURBLESS SHOWER","EXTEND THE SHOWER","EXISTING DOUBLE VANITY","SINGLE SINK"]},
    {key:"ext_bath_hvac",label:"HVAC Extras",pfx:["INSTALLING NON EXISTING EXHUAST","REPLACING AN EXISTING EXHAUST","MOVING HEAT VENT"]},
    {key:"ext_bath_tile",label:"Tile Extras",pfx:["UNUSUAL SHAPE","SUBSTITUE TILE","BATHROOM FLOOR TILE","INSTALLING HEATED FLOORS","LARGE FORMAT TILE"]},
  ],
  "Kitchen Extras": [
    {key:"ext_kit_demo",label:"Kitchen Demo",pfx:["SOFFIT REMOVAL (Ceiling is staying) **","SOFFIT REMOVAL ( with ceiling demo) **","WALL DRYWALL REPLACEMENT.","DEMO FLOOR TILE","CEILING DRYWALL REPLACEMENT","Tile Removal","Demo of Hard Wood","Demo of LVP","Repair Sub Floor"]},
    {key:"ext_kit_electrical",label:"Kitchen Electrical",pfx:["INSTALL NON EXISTING LIGHT","Move 220V","MOVE PLUGS","Recessed Lights"]},
    {key:"ext_kit_flooring",label:"Kitchen Flooring",pfx:["Shoe molding","New Baseboard","Adding Stair Nosing","Move Furniture","Floor Raising","FirePlace Transition","Transitions","Stairs","Floor Prep","Baseboard REMOVE","Move Appliances"]},
    {key:"ext_kit_plumbing",label:"Kitchen Plumbing",pfx:["MAJOR KITCHEN PLUMBING","INSTALL NON EXISTING POT FILLER"]},
    {key:"ext_kit_tile",label:"Kitchen Tile",pfx:["TILE BACKSPLASH","CROWN MOULDING"]},
    {key:"ext_kit_items",label:"Kitchen Items",pfx:["QUARTZ COUNTERTOPS","Special Order Material"]},
    {key:"ext_kit_cabinet",label:"Cabinet Extras",pfx:["CABINET EXTRAS"]},
    {key:"ext_kit_undercab",label:"Under Cabinet Lighting",pfx:["UNDER CABINET"]},
    {key:"ext_kit_painting",label:"Kitchen Painting",pfx:["PAINTING","KITCHEN PAINT"]},
  ],
  "Roofing Extras": [
    {key:"ext_roof_misc",label:"Miscellaneous",pfx:["Roof Misc"]},
    {key:"ext_roof_extra",label:"Roofing Extras",pfx:["Roof Extra","ROOFING EXTRA"]},
  ],
};

const getProductCategory = (product) => {
  // Use pricebook category/subcategory if available
  if (product.cat && product.sub && product.cat !== "General") {
    // Find matching PB_CATS entry by subcategory label
    for (const [cat, subs] of Object.entries(PB_CATS)) {
      for (const sub of subs) {
        if (sub.label === product.sub || sub.pfx.some(px => product.name.startsWith(px))) return {cat, sub: sub.label, subKey: sub.key};
      }
    }
    // Fallback: use embedded cat/sub directly
    return {cat: product.cat, sub: product.sub, subKey: product.sub.toLowerCase().replace(/\s+/g,"_")};
  }
  for (const [cat, subs] of Object.entries(PB_CATS)) {
    for (const sub of subs) {
      if (sub.pfx.some(px => product.name.startsWith(px))) return {cat, sub: sub.label, subKey: sub.key};
    }
  }
  return {cat: "General", sub: "Uncategorized", subKey: "uncategorized"};
};

/* ─── ROOFING WIZARD STEPS ─── */
const ROOFING_STEPS = [
  {key:"roof_package",label:"Roof Package",pfx:["Roof Package"]},
  {key:"roof_shingles",label:"Shingle Upgrade",pfx:["Roof Shingles"]},
  {key:"roof_underlayment",label:"Underlayment",pfx:["Roof Underlayment"]},
  {key:"roof_ventilation",label:"Ventilation",pfx:["Roof Ventilation"]},
  {key:"roof_gutters",label:"Gutters",pfx:["Roof Gutters"]},
  {key:"roof_flat",label:"Flat Roofing",pfx:["Roof Flat"]},
];
const ROOF_SIZES = ["Small (up to 1500 sq ft)","Medium (1500-2500 sq ft)","Large (2500+ sq ft)"];

/* ─── EXTRAS CATEGORIES ─── */
/* ─── EXTRAS BY BUILD TYPE ─── */
const EXTRAS_BY_TYPE = {
  "Bathroom": [
    {key:"bath_shower_only",label:"Shower Only",keywords:["REPLACE TOILET","REPLACE VANITY LIGHT","REPLACE MIRROR","REPLACE VANITY FAUCET","PAINT BATHROOM","REPLACE VANITY","QUARTZ COUNTERTOPS","RAISING DOOR THRESHOLD","Special Order Material"]},
    {key:"bath_demo",label:"Demo Extras",keywords:["DRYWALL REPLACEMENT","DEMO FLOOR TILE","CEILING DRYWALL","SOFFIT REMOVAL","JAQUZZI","Repair Sub Floor","rotted"],excludeKeywords:["LINEAR FOOT"]},
    {key:"bath_electrical",label:"Electrical Extras",keywords:["INSTALLING A LIGHTED MIRROR","INSTALL NON EXISTING VANITY LIGHT","MOVE VANITY LIGHT","MOVE PLUGS","ADD PLUGS","20 AMP GFI","INSTALL NON EXISTING LIGHT"]},
    {key:"bath_framing",label:"Framing Extras",keywords:["ADDING A CLOSET","EXPANDING OF BATHROOM","PRE HUNG DOOR","FLOOR RASING","SUBFLOOR REPLACEMENT","CUTTING SHOWER WALL"]},
    {key:"bath_plumbing",label:"Plumbing Extras",keywords:["MOVING SINGLE VANITY","MOVING DOUBLE VANITY","MAJOR PLUMBING","ADDITIONAL SHOWER DIVERTER","NON EXISTING SHOWER ADD","FREE STANDING TUB REPLACE","CURBLESS SHOWER","EXTEND THE SHOWER","EXISTING DOUBLE VANITY ADD","INSTALLING LARGER VANITY","SINGLE SINK TO DOUBLE"]},
    {key:"bath_hvac",label:"HVAC Extras",keywords:["EXHUAST FAN","EXHAUST FAN","HEAT VENT","COLD AIR RETURN"]},
    {key:"bath_tile",label:"Tile Extras",keywords:["UNUSUAL SHAPE","SUBSTITUE TILE","BATHROOM FLOOR TILE","HEATED FLOORS","LARGE FORMAT TILE","WAINSCOTTING"]},
  ],
  "Kitchen": [
    {key:"kit_demo",label:"Kitchen Demo",keywords:["LINEAR FOOT PRICE","WALL DRYWALL REPLACEMENT","DEMO FLOOR TILE","CEILING DRYWALL","Repair Sub Floor","rotted","Tile Removal","Demo of Hard Wood","Demo of LVP"]},
    {key:"kit_electrical",label:"Kitchen Electrical",keywords:["INSTALL NON EXISTING LIGHT","Move 220V","MOVE PLUGS","ADD PLUGS","Recessed Lights"]},
    {key:"kit_flooring",label:"Kitchen Flooring",keywords:["Luxury Vinyl Flooring","Luxury Vinyl Tile","LVP FLOOR","Shoe molding","New Baseboard","Adding Stair Nosing","Move Furniture","Floor Raising","FirePlace Transition","Transitions -","Stairs -","Floor Prep","Baseboard REMOVE","Move Appliances","KITCHEN FLOORING"]},
    {key:"kit_plumbing",label:"Kitchen Plumbing",keywords:["MAJOR KITCHEN PLUMBING","MAJOR PLUMBING","INSTALL NON EXISTING POT FILLER","GARBAGE DISPOSAL"]},
    {key:"kit_tile",label:"Kitchen Tile",keywords:["TILE BACKSPLASH","CROWN MOULDING"]},
    {key:"kit_items",label:"Kitchen Items",keywords:["QUARTZ COUNTERTOPS","Kitchen Countertops","KITCHEN PANTRY","KITCHEN OVEN PANTRY","POT FILLERS","KITCHEN SINK FAUCET","AIR SWITCHES","GLASS RINSER","SOAP DISPENSER","BEVERAGE FAUCET","KITCHEN SINK","SINGLE BOWL","WORK STATIONS"]},
    {key:"kit_cabinet_extras",label:"Cabinet Extras",keywords:["CABINET EXTRAS"]},
    {key:"kit_under_cab",label:"Under Cabinet Lighting",keywords:["UNDER CABINET"]},
    {key:"kit_painting",label:"Kitchen Painting",keywords:["PAINTING","KITCHEN PAINT"]},
  ],
  "Roofing": [
    {key:"roof_misc_ext",label:"Miscellaneous",keywords:["Roof Misc","OSB","Additional Layers","Steep Pitch","Roof Mounted","Rafter Replacement","Clean Up Fee"]},
    {key:"roof_extras",label:"Roofing Extras",keywords:["ROOF EXTRA","ROOFING EXTRA"]},
  ],
};

// Get extras categories based on build type
const getExtrasCatsForType = (buildType) => {
  if (buildType.includes("Bathroom") || buildType.includes("Wet") || buildType.includes("Half Bath")) return EXTRAS_BY_TYPE["Bathroom"];
  if (buildType.includes("Kitchen")) return EXTRAS_BY_TYPE["Kitchen"];
  if (buildType.includes("Roofing")) return EXTRAS_BY_TYPE["Roofing"];
  return [...EXTRAS_BY_TYPE["Bathroom"], ...EXTRAS_BY_TYPE["Kitchen"]];
};

// Flat list of all extras categories for the ExtrasPanel (used for all build types)
const ALL_EXTRAS_CATS = [...EXTRAS_BY_TYPE["Bathroom"], ...EXTRAS_BY_TYPE["Kitchen"], ...EXTRAS_BY_TYPE["Roofing"]];

const getExtrasForCat_static = (cat) => {
  return ALL_PRODUCTS.filter(p => {
    return cat.keywords.some(kw => p.name.toUpperCase().includes(kw.toUpperCase()));
  });
};

const FULL_BATH_STEPS = [
  {key:"shower_wall",label:"Shower Wall",pfx:["Luxura Nowstone","Monterey Velvet Smooth Finish","Monterey Subway Pattern","Durasein"],brandFilter:true},
  {key:"vanity",label:"Vanity",pfx:["Vanities"]},
  {key:"wall_vanity",label:"Wall to Wall Vanity",pfx:["Wall To Wall Vanities"]},
  {key:"tops",label:"Tops",pfx:["Tops"]},
  {key:"vanity_faucet",label:"Vanity Faucet",pfx:["Vanity Faucets"],doubleQty:true},
  {key:"shower_pan",label:"Shower Pan",pfx:["Shower Pan"],showWhen:"shower"},
  {key:"bathtub",label:"Bathtub",pfx:["Bathtubs"],showWhen:"bathtub"},
  {key:"shower_trim",label:"Shower Trim Kit",pfx:["Shower Diverter Trim Kits"],showWhen:"shower"},
  {key:"bathtub_trim",label:"Bathtub Trim Kit",pfx:["Bathtub Diverter Trim Kits"],showWhen:"bathtub"},
  {key:"towel_bar",label:"Towel Bar Kit",pfx:["Towel Bar Kit"]},
  {key:"mirror",label:"Vanity Mirror",pfx:["Vanity Mirror"],doubleQty:true},
  {key:"medicine_cab",label:"Medicine Cabinet",pfx:["Medicine Cabinets"]},
  {key:"shower_doors",label:"Shower Doors",pfx:["Shower Doors"],showWhen:"shower"},
  {key:"bathtub_doors",label:"Bathtub Doors",pfx:["Bathtub Doors"],showWhen:"bathtub"},
  {key:"lighting",label:"Lighting",pfx:["Lighting"],doubleQty:true},
  {key:"grab_bars",label:"Grab Bars",pfx:["Grab Bars"]},
  {key:"grab_bars_2",label:"Secondary Grab Bars",pfx:["Grab Bars"]},
  {key:"freestanding_tub",label:"Freestanding Tub",pfx:["Free Standing Tub"]},
  {key:"tub_filler",label:"Freestanding Tub Filler",pfx:["Free Standing Tub Fillers"]},
  {key:"toilet",label:"Toilets",pfx:["Toilets"]},
  {key:"shower_bench",label:"Shower Bench",pfx:["Flip Up Shower Bench"]},
  {key:"foot_rest",label:"Wall Mounted Foot Rest",pfx:["Wall Mounted Foot Rest"]},
  {key:"niche",label:"Nowstone Niche",pfx:["Nowstone Niche"]},
  {key:"bath_flooring",label:"Bathroom Flooring",pfx:["LVP OR LVT FLOORING","Luxury Vinyl Tile","Luxury Vinyl Flooring","LVP FLOOR COLORS"]},
];

const WET_AREA_STEPS = [
  {key:"shower_wall",label:"Shower Wall",pfx:["Luxura Nowstone","Monterey Velvet Smooth Finish","Monterey Subway Pattern","Durasein"],brandFilter:true},
  {key:"shower_pan",label:"Shower Pan",pfx:["Shower Pan"],showWhen:"shower"},
  {key:"bathtub",label:"Bathtub",pfx:["Bathtubs"],showWhen:"bathtub"},
  {key:"shower_trim",label:"Shower Trim Kit",pfx:["Shower Diverter Trim Kits"],showWhen:"shower"},
  {key:"bathtub_trim",label:"Bathtub Trim Kit",pfx:["Bathtub Diverter Trim Kits"],showWhen:"bathtub"},
  {key:"shower_doors",label:"Shower Doors",pfx:["Shower Doors"],showWhen:"shower"},
  {key:"bathtub_doors",label:"Bathtub Doors",pfx:["Bathtub Doors"],showWhen:"bathtub"},
  {key:"grab_bars",label:"Grab Bars",pfx:["Grab Bars"]},
  {key:"grab_bars_2",label:"Secondary Grab Bars",pfx:["Grab Bars"]},
  {key:"freestanding_tub",label:"Freestanding Tub",pfx:["Free Standing Tub"]},
  {key:"tub_filler",label:"Freestanding Tub Filler",pfx:["Free Standing Tub Fillers"]},
  {key:"toilet",label:"Toilets",pfx:["Toilets"]},
  {key:"shower_bench",label:"Shower Bench",pfx:["Flip Up Shower Bench"]},
  {key:"foot_rest",label:"Wall Mounted Foot Rest",pfx:["Wall Mounted Foot Rest"]},
  {key:"niche",label:"Nowstone Niche",pfx:["Nowstone Niche"]},
  {key:"bath_floor_type",label:"Bathroom Flooring",pfx:["LVP OR LVT FLOORING"]},
  {key:"bath_floor_style",label:"Bathroom Flooring Style",pfx:["Luxury Vinyl Tile","Luxury Vinyl Flooring","LVP FLOOR COLORS"]},
];

const HALF_BATH_STEPS = [
  {key:"vanity",label:"Vanity",pfx:["Vanities"]},
  {key:"wall_vanity",label:"Wall to Wall Vanity",pfx:["Wall To Wall Vanities"]},
  {key:"tops",label:"Tops",pfx:["Tops"]},
  {key:"vanity_faucet",label:"Vanity Faucet",pfx:["Vanity Faucets"]},
  {key:"mirror",label:"Vanity Mirror",pfx:["Vanity Mirror"]},
  {key:"medicine_cab",label:"Medicine Cabinet",pfx:["Medicine Cabinets"]},
  {key:"lighting",label:"Lighting",pfx:["Lighting"]},
  {key:"toilet",label:"Toilets",pfx:["Toilets"]},
  {key:"bath_floor_type",label:"Bathroom Flooring",pfx:["LVP OR LVT FLOORING"]},
  {key:"bath_floor_style",label:"Bathroom Flooring Style",pfx:["Luxury Vinyl Tile","Luxury Vinyl Flooring","LVP FLOOR COLORS"]},
];

const KITCHEN_STEPS = [
  {key:"kitchen_cab",label:"Kitchen Cabinet",pfx:["KITCHEN CABINETS"]},
  {key:"kitchen_glass",label:"Glass Uppers",pfx:["KITCHEN CABINETS GLASS UPPERS"]},
  {key:"kitchen_cab_ct",label:"Cabinet w/ Countertop",pfx:["BASES ONLY WITH COUNTER TOP"]},
  {key:"kitchen_ct",label:"Kitchen Countertop",pfx:["Kitchen Countertops"]},
  {key:"kitchen_pantry",label:"Pantry Cabinets",pfx:["KITCHEN PANTRY CABINETS"]},
  {key:"kitchen_oven",label:"Oven Pantry Cabinets",pfx:["KITCHEN OVEN PANTRY CABINETS"]},
  {key:"kitchen_floor",label:"Kitchen Flooring",pfx:["KITCHEN FLOORING"]},
  {key:"kitchen_floor_color",label:"Flooring Color",pfx:["LVP FLOOR COLORS","CARPET COLORS"]},
  {key:"pot_filler",label:"Pot Filler",pfx:["POT FILLERS"]},
  {key:"glass_rinser",label:"Glass Rinser",pfx:["GLASS RINSER"]},
  {key:"soap_disp",label:"Soap Dispenser",pfx:["SOAP DISPENSER"]},
  {key:"bev_faucet",label:"Beverage Faucet",pfx:["BEVERAGE FAUCET"]},
  {key:"hood_vent",label:"Hood Vent",pfx:["HOOD VENTS","EXHUAST HOOD VENTS"]},
  {key:"kitchen_light",label:"Kitchen Lighting",pfx:["KITCHEN LIGHTING"]},
  {key:"kitchen_sink",label:"Kitchen Sinks",pfx:["KITCHEN SINK","SINGLE BOWL SINKS","WORK STATIONS","36 INCH BASE DOUBLE SINK"]},
  {key:"kitchen_faucet",label:"Sink Faucet",pfx:["KITCHEN SINK FAUCETS"]},
];

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Instrument+Serif:ital@0;1&display=swap');
:root{--bg:#141825;--c1:#1a2035;--c2:#222840;--ci:#161c30;--bd:#2a3150;--bf:#4b7cf5;--tx:#f0f2f8;--t2:#8e95b0;--t3:#7a82a0;--ac:#4b7cf5;--a2:#6b96ff;--ad:rgba(75,124,245,.12);--ok:#34ddb0;--od:rgba(52,221,176,.12);--wn:#f5a623;--wd:rgba(245,166,35,.12);--er:#f06060;--ed:rgba(240,96,96,.1);--gd:#e0b854;--gdd:rgba(224,184,84,.12);--r:8px;--r2:12px;--f:'DM Sans',sans-serif;--fd:'Instrument Serif',serif}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--tx);font-family:var(--f)}
.app{display:flex;height:100vh;overflow:hidden;position:relative}
.sb{width:240px;min-width:240px;background:var(--c1);border-right:1px solid var(--bd);display:flex;flex-direction:column}
.sb-h{padding:14px;border-bottom:1px solid var(--bd)}.sb-logo{font-family:var(--fd);font-size:20px}.sb-logo span{color:var(--ac)}.sb-sub{font-size:9px;color:var(--t2);margin-top:1px;letter-spacing:.08em;text-transform:uppercase}
.sb-n{padding:8px;flex:1;overflow-y:auto}.sb-s{margin-bottom:12px}.sb-l{font-size:8px;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);padding:4px 8px;font-weight:700}
.ni{display:flex;align-items:center;gap:7px;padding:6px 9px;border-radius:var(--r);color:var(--t2);cursor:pointer;font-size:11.5px;transition:all .12s;font-weight:500}.ni:hover{background:var(--c2);color:var(--tx)}.ni.a{background:var(--ad);color:var(--a2)}.ni .bg{margin-left:auto;font-size:9px;padding:1px 5px;border-radius:8px;font-weight:600;background:var(--ad);color:var(--ac)}
.mn{flex:1;display:flex;flex-direction:column;overflow:hidden}
@media(max-width:768px){.mn{margin-top:48px}}
.tb{height:48px;min-height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--bd);background:var(--c1)}.tb-t{font-size:13px;font-weight:600}.tb-a{display:flex;gap:4px;align-items:center}
.ct{flex:1;overflow-y:auto;padding:16px}
.btn{display:inline-flex;align-items:center;gap:4px;padding:5px 11px;border-radius:var(--r);border:1px solid var(--bd);background:var(--c1);color:var(--tx);font-size:11px;cursor:pointer;font-family:var(--f);font-weight:500;transition:all .12s;white-space:nowrap}.btn:hover{background:var(--c2);border-color:var(--t3)}
.bp{background:var(--ac);border-color:var(--ac);color:#fff}.bp:hover{background:var(--a2)}.bo{background:var(--ok);border-color:var(--ok);color:#0B0D10}.bo:hover{opacity:.9}
.bs{padding:3px 7px;font-size:10px}.bg2{background:transparent;border:none;color:var(--t2);padding:3px;cursor:pointer}.bg2:hover{color:var(--tx);background:var(--c2)}.bgd{background:var(--gd);border-color:var(--gd);color:#0B0D10;font-weight:600}.bgd:hover{opacity:.9}
.cd{background:var(--c1);border:1px solid var(--bd);border-radius:var(--r2);padding:14px;margin-bottom:10px}.cd-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.cd-t{font-size:12px;font-weight:600}
.ig{margin-bottom:9px}.ig label{display:block;font-size:9px;font-weight:600;color:var(--t2);margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em}
.inp{width:100%;padding:6px 9px;border-radius:var(--r);border:1px solid var(--bd);background:var(--ci);color:var(--tx);font-size:11.5px;font-family:var(--f)}.inp:focus{outline:none;border-color:var(--bf)}.is{padding:4px 7px;font-size:10.5px}
table{width:100%;border-collapse:collapse;font-size:11px}th{text-align:left;padding:5px 7px;font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:var(--t3);border-bottom:1px solid var(--bd);font-weight:600}td{padding:6px 7px;border-bottom:1px solid var(--bd)}tr:hover td{background:var(--c2)}.nm{font-variant-numeric:tabular-nums}
.tg{display:inline-flex;padding:2px 6px;border-radius:12px;font-size:9px;font-weight:600}.tbl{background:var(--ad);color:var(--a2)}.tok{background:var(--od);color:var(--ok)}.tw{background:var(--gdd);color:var(--gd)}.te{background:var(--ed);color:var(--er)}
.sr{display:flex;gap:10px;padding:10px 14px;background:var(--ci);border-radius:var(--r2);margin-bottom:12px;flex-wrap:wrap;align-items:flex-end}.ss{display:flex;flex-direction:column}.ssl{font-size:8px;text-transform:uppercase;letter-spacing:.07em;color:var(--t3)}.ssv{font-size:15px;font-weight:700;margin-top:1px;font-variant-numeric:tabular-nums}
.em{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 16px;color:var(--t3);text-align:center}.em svg{margin-bottom:10px;opacity:.3}.em p{font-size:11px;max-width:250px}
.mo{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100;display:flex;align-items:center;justify-content:center}.ml{background:var(--c1);border:1px solid var(--bd);border-radius:var(--r2);padding:18px;width:92%;max-width:540px;max-height:82vh;overflow-y:auto}.mlt{font-size:14px;font-weight:700;margin-bottom:10px}.g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.cv{background:#fafaf8;color:#1a1a1a;border-radius:var(--r2);padding:24px;max-width:640px}.cv h2{font-family:var(--fd);font-size:22px;margin-bottom:2px}.cv .sub{font-size:10px;color:#888;margin-bottom:16px}.cv .bc{background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:12px;margin-bottom:8px}.cv .ln{display:flex;justify-content:space-between;padding:2px 0;font-size:11.5px}.cv .tot{display:flex;justify-content:space-between;padding:8px 0;font-size:15px;font-weight:700;border-top:2px solid #1a1a1a;margin-top:6px}
.con{background:#fff;color:#1a1a1a;border-radius:var(--r2);padding:28px;max-width:720px;font-size:11.5px;line-height:1.7}.con h1{font-family:var(--fd);font-size:24px;margin-bottom:2px}.con h3{font-size:13px;margin:14px 0 4px}.con .sig{border-top:1px solid #aaa;width:200px;margin-top:36px;padding-top:4px;font-size:9px;color:#888}
.wiz-steps{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:14px;padding:10px;background:var(--ci);border-radius:var(--r2)}
.ws{padding:4px 9px;border-radius:var(--r);font-size:9.5px;font-weight:600;cursor:pointer;border:1px solid var(--bd);background:var(--c1);color:var(--t3);transition:all .15s;display:flex;align-items:center;gap:3px}
.ws.cur{border-color:var(--ac);background:var(--ad);color:var(--a2)}.ws.done{border-color:var(--ok);background:var(--od);color:var(--ok)}.ws.skip{border-color:var(--t3);background:transparent;color:var(--t3);text-decoration:line-through;opacity:.5}.ws.blk{opacity:.4;cursor:not-allowed}
.pc{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid var(--bd);border-radius:var(--r);margin-bottom:4px;cursor:pointer;transition:all .12s;background:var(--c1)}
.pc:hover{border-color:var(--a2);background:var(--ad)}.pc.sel{border-color:var(--ok);background:var(--od)}
.pc .pn{font-size:11px;font-weight:500;word-break:break-word}
.pc .pp{font-size:11px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;margin-left:8px}
.pc .pa{font-size:9px;color:var(--t2);margin-top:1px}
.nc{border-color:var(--wn);background:var(--wd)}.nc:hover{border-color:var(--wn)}.nc.sel{border-color:var(--ok);background:var(--od)}
.co{padding:10px 14px;border:2px solid var(--bd);border-radius:var(--r2);cursor:pointer;text-align:center;font-weight:600;font-size:13px;transition:all .15s;background:var(--c1)}
.co:hover{border-color:var(--a2);background:var(--ad)}.co.sel{border-color:var(--ac);background:var(--ad);color:var(--a2);box-shadow:0 0 0 1px var(--ac)}
.cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:16px}
.db{display:flex;align-items:center;gap:5px;padding:8px 10px;background:var(--gdd);border:1px solid rgba(212,164,74,.2);border-radius:var(--r);margin-bottom:10px}.dc{display:flex;gap:2px}.dch{padding:2px 7px;border-radius:10px;font-size:10px;font-weight:600;background:rgba(212,164,74,.15);color:var(--gd);cursor:pointer;border:1px solid transparent;transition:all .12s}.dch:hover,.dch.a{background:var(--gd);color:#0B0D10;border-color:var(--gd)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd);border-radius:3px}
@media(max-width:768px){
.sb{position:fixed;left:-260px;top:0;bottom:0;z-index:90;transition:left .25s ease;box-shadow:none}
.sb.open{left:0;box-shadow:4px 0 24px rgba(0,0,0,.5)}
.mob-hdr{display:flex}
.mob-bn{display:flex}
.mob-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:89}
.mob-ov.open{display:block}
.mn{padding-bottom:60px}
.app{height:100dvh;overflow:hidden;position:fixed;inset:0}
.ct{-webkit-overflow-scrolling:touch}
.tb{flex-shrink:0}
.sr{flex-direction:column;gap:6px;align-items:stretch}
.sr .ss{flex-direction:row;justify-content:space-between;align-items:center}
.sr .ssl{margin-bottom:0}
.sr .ssv{font-size:13px}
.tb{padding:0 10px}
.ct{padding:10px}
.cd{padding:10px}
.g2{grid-template-columns:1fr}
.cg{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))}
.pc .pn{max-width:none}
.con{padding:16px}
.cv{padding:16px}
.ml{padding:12px;max-height:90vh}
.wiz-steps{gap:2px;padding:6px}
.ws{font-size:8.5px;padding:3px 6px}
@media(max-width:768px){select.inp,input.inp,textarea.inp,select.is,input.is{font-size:16px !important}}
}
@media(min-width:769px){.mob-hdr,.mob-bn,.mob-ov{display:none !important}}
@media print{
  body{background:#fff !important}
  .app,.sb,.mob-hdr,.mob-bn,.tb,.sr,.mn{display:none !important}
  .mo{position:static !important;background:none !important}
  .ml{max-width:none !important;max-height:none !important;border:none !important;padding:0 !important;overflow:visible !important;width:100% !important}
  .po-print{display:block !important}
  .po-page{box-shadow:none !important;margin:0 !important;border-radius:0 !important;page-break-after:always}
  .po-page:last-child{page-break-after:auto}
  button{display:none !important}
}
`;

/* ─── APP ─── */
export default function RemodelProApp({ user, profile, supabase, onSignOut }) {
  // Admin detection: checks profile.role, profile.is_admin, or email match
  const ADMIN_EMAILS = ["justin@yourconnextion.com","admin@renovationsnow.com"]; // Add admin emails here
  const isAdmin = profile?.role === "admin" || profile?.is_admin === true || ADMIN_EMAILS.includes(user?.email?.toLowerCase());
  const [view, setView] = useState("projects");
  const [customers, setCustomers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // admin: list of all users
  const [viewAsUser, setViewAsUser] = useState(null); // admin: filter by user id
  const [aCust, setACust] = useState(null);
  const [aProj, setAProj] = useState(null);
  const [aBuild, setABuild] = useState(null);
  const [search, setSearch] = useState("");
  const [pbSearch, setPbSearch] = useState("");
  const [pbCat, setPbCat] = useState(null); // primary category
  const [pbSub, setPbSub] = useState(null); // subcategory key
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({name:"",price:"",cost:"",sku:"",supplier:"",itemType:"Product",f1v:"",f2v:"",f3v:""});
  const [customProducts, setCustomProducts] = useState([]);
  const [productOverrides, setProductOverrides] = useState({}); // {productId: {name,price,sku,supplier,desc}}
  const [editingId, setEditingId] = useState(null); // product id being edited
  const [editData, setEditData] = useState({});
  const [basePriceOverrides, setBasePriceOverrides] = useState({}); // {key: newPrice}
  const [adminTab, setAdminTab] = useState("base"); // "base", "bulk", "csv"
  const [modal, setModal] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const [ghl, setGhl] = useState({apiKey:"",locationId:"",pipelineId:"",stageId:"",webhookUrl:"",enabled:false});
  const [fd, setFd] = useState({});
  const [wizStep, setWizStep] = useState(0);
  const [wizConfig, setWizConfig] = useState({});
  const [wizSel, setWizSel] = useState({});
  const [wizFilters, setWizFilters] = useState({}); // {stepKey: {f1: val, f2: val, f3: val}}
  const [sending, setSending] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [actionModal, setActionModal] = useState(null); // "noDemo"|"pitchMiss"|"changeOrder"|null
  const [noDemoReason, setNoDemoReason] = useState("");
  const [changeOrder, setChangeOrder] = useState({buildId:"",items:[],chargeable:true}); // {buildId, items:[{type,stepLabel,oldProduct,newProduct,price,qty}], chargeable}

  useEffect(() => {
    (async () => {
      // Load customers from Supabase
      if (supabase) {
        try {
          const { data: custs } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
          if (custs) {
            // Build unique user list from customers AND profiles table
            const users = {};
            custs.forEach(c => { if(c.created_by_email) users[c.created_by||"unknown"] = c.created_by_email; });
            // Also try loading from profiles table for complete user list
            try {
              const { data: profiles } = await supabase.from('profiles').select('id,email,full_name,role');
              if (profiles) profiles.forEach(pr => { if(pr.email) users[pr.id] = pr.email; });
            } catch(e) {}
            setAllUsers(Object.entries(users).map(([id,email])=>({id,email})));
            // Convert flat Supabase customers to nested format with projects/builds
            const enriched = await Promise.all(custs.map(async c => {
              const { data: projs } = await supabase.from('projects').select('*').eq('customer_id', c.id);
              const projects = await Promise.all((projs||[]).map(async p => {
                const { data: blds } = await supabase.from('builds').select('*').eq('project_id', p.id);
                return { ...p, discounts: p.discounts||[], orderedAt: p.ordered_at||"", jobDate: p.job_date||"", locked: p.locked||false, result: p.result||"", resultDate: p.result_date||"", noDemoReason: p.no_demo_reason||"", laborCost: p.labor_cost||0, builds: (blds||[]).map(b => ({...b, payTerms: b.pay_terms, payType: b.pay_terms?.payType||"", finType: b.pay_terms?.finType||"", wizConfig: b.wiz_config, wizStep: b.wiz_config?.wizStep, wizSelections: b.wiz_selections})) };
              }));
              return { ...c, projects };
            }));
            setCustomers(enriched);
          }
        } catch(e) { console.error('Load customers error:', e); }
        // Load integration settings
        try {
          const { data: ghlData } = await supabase.from('ghl_settings').select('*').single();
          if (ghlData) setGhl({apiKey:ghlData.api_key||"",locationId:ghlData.location_id||"",pipelineId:ghlData.pipeline_id||"",stageId:ghlData.stage_id||"",webhookUrl:ghlData.webhook_url||"",enabled:ghlData.enabled||false});
        } catch(e) {}
      }
      // Pricebook custom products & overrides - load from dedicated pricebook_settings table
      let pbLoaded = false;
      if (supabase) {
        try {
          const { data: pbRow, error: pbErr } = await supabase.from('pricebook_settings').select('*').limit(1).single();
          if (!pbErr && pbRow) {
            if (pbRow.custom_products && Array.isArray(pbRow.custom_products) && pbRow.custom_products.length > 0) { setCustomProducts(pbRow.custom_products); pbLoaded = true; }
            if (pbRow.product_overrides && typeof pbRow.product_overrides === 'object' && Object.keys(pbRow.product_overrides).length > 0) { setProductOverrides(pbRow.product_overrides); pbLoaded = true; }
            if (pbRow.base_price_overrides && typeof pbRow.base_price_overrides === 'object' && Object.keys(pbRow.base_price_overrides).length > 0) { setBasePriceOverrides(pbRow.base_price_overrides); pbLoaded = true; }
          }
          if (pbErr) console.log("pricebook_settings load:", pbErr.message);
        } catch(e) { console.error("Load pricebook error:", e); }
      }
      if (!pbLoaded) {
        try { const cp = localStorage.getItem("pb_custom_products"); if (cp) setCustomProducts(JSON.parse(cp)); } catch(e){}
        try { const ov = localStorage.getItem("pb_overrides"); if (ov) setProductOverrides(JSON.parse(ov)); } catch(e){}
        try { const bp = localStorage.getItem("base_price_overrides"); if (bp) setBasePriceOverrides(JSON.parse(bp)); } catch(e){}
      }
      try { const pl = localStorage.getItem("price_change_log"); if (pl) setPriceLog(JSON.parse(pl)); } catch(e){}
    })();
  }, [supabase]);

  // Reusable function to load pricebook data from Supabase
  const refreshPricebook = useCallback(async (silent) => {
    if (!supabase) return;
    try {
      const { data: pbRow, error } = await supabase.from('pricebook_settings').select('*').limit(1).single();
      if (error) { if(!silent) flash("Pricebook sync error: " + error.message, "er"); console.error("PB sync error:", error); return; }
      if (pbRow) {
        if (pbRow.custom_products && Array.isArray(pbRow.custom_products)) setCustomProducts(pbRow.custom_products);
        if (pbRow.product_overrides && typeof pbRow.product_overrides === 'object') setProductOverrides(pbRow.product_overrides);
        if (pbRow.base_price_overrides && typeof pbRow.base_price_overrides === 'object') setBasePriceOverrides(pbRow.base_price_overrides);
        if (!silent) flash("Pricebook synced from server");
      }
    } catch(e) { if(!silent) flash("Sync failed: " + e.message, "er"); }
  }, [supabase]);

  // Auto-refresh pricebook every 2 minutes so other devices pick up changes
  useEffect(() => {
    if (!supabase) return;
    const interval = setInterval(() => refreshPricebook(true), 120000);
    return () => clearInterval(interval);
  }, [supabase, refreshPricebook]);

  // --- Supabase persistence helpers ---
  const sbSyncBuild = useCallback(async (buildObj) => {
    if (!supabase || !buildObj || !buildObj.id) return;
    try {
      await supabase.from('builds').update({
        name: buildObj.name, type: buildObj.type, status: buildObj.status,
        items: buildObj.items || [], extras: buildObj.extras || [],
        discounts: buildObj.discounts || [],
        pay_terms: {...(buildObj.payTerms || {p1:25,p1l:"Due at Signing",p2:25,p2l:"Due at Start",p3:0,p3l:"Due at Midpoint",p4:50,p4l:"Due upon Completion",useP3:false}), payType: buildObj.payType||"", finType: buildObj.finType||""},
        wiz_config: {...(buildObj.wizConfig || {}), wizStep: buildObj.wizStep}, wiz_selections: buildObj.wizSelections || {},
        updated_at: new Date().toISOString()
      }).eq('id', buildObj.id);
    } catch(e) { console.error('Sync build error:', e); }
  }, [supabase]);

  const sbSyncProject = useCallback(async (projObj) => {
    if (!supabase || !projObj || !projObj.id) return;
    try {
      await supabase.from('projects').update({
        name: projObj.name, status: projObj.status,
        discounts: projObj.discounts || [],
        ordered_at: projObj.orderedAt || null,
        job_date: projObj.jobDate || null,
        locked: projObj.locked || false,
        result: projObj.result || null,
        result_date: projObj.resultDate || null,
        no_demo_reason: projObj.noDemoReason || null,
        labor_cost: projObj.laborCost || 0,
        updated_at: new Date().toISOString()
      }).eq('id', projObj.id);
    } catch(e) { console.error('Sync project error:', e); }
  }, [supabase]);

  // Debounced sync: after any updC, sync affected build/project to Supabase
  const syncRef = useRef(null);
  const saveC = useCallback((c) => {
    setCustomers(c);
    // Debounced sync to Supabase for the active build/project
    if (syncRef.current) clearTimeout(syncRef.current);
    syncRef.current = setTimeout(() => {
      if (!supabase) return;
      // Find active customer/project/build in the new state and sync
      const ac = c.find(x => x.id === aCust);
      if (!ac) return;
      const ap = ac.projects ? ac.projects.find(x => x.id === aProj) : null;
      if (ap) {
        sbSyncProject(ap);
        if (ap.builds) {
          ap.builds.forEach(b => sbSyncBuild(b));
        }
      }
    }, 600);
  }, [supabase, aCust, aProj, sbSyncBuild, sbSyncProject]);

  const saveG = useCallback(async g => {
    setGhl(g);
    if (supabase) {
      try {
        const { data: existing } = await supabase.from('ghl_settings').select('id').limit(1).single();
        if (existing) {
          await supabase.from('ghl_settings').update({api_key:g.apiKey,location_id:g.locationId,pipeline_id:g.pipelineId,stage_id:g.stageId,webhook_url:g.webhookUrl,enabled:g.enabled}).eq('id', existing.id);
        } else {
          await supabase.from('ghl_settings').insert({api_key:g.apiKey,location_id:g.locationId,pipeline_id:g.pipelineId,stage_id:g.stageId,webhook_url:g.webhookUrl,enabled:g.enabled});
        }
      } catch(e) { console.error('Save integration error:', e); }
    }
  }, [supabase]);

  const saveCP = useCallback(async p => {
    setCustomProducts(p);
    try { localStorage.setItem("pb_custom_products", JSON.stringify(p)); } catch(e) {}
    if (supabase) { try { 
      const { data: ex } = await supabase.from('pricebook_settings').select('id').limit(1).single();
      if (ex) { 
        const {error} = await supabase.from('pricebook_settings').update({custom_products: p, updated_at: new Date().toISOString()}).eq('id', ex.id); 
        if(error) console.error("Save custom products error:", error); 
      } else {
        const {error} = await supabase.from('pricebook_settings').insert({custom_products: p});
        if(error) console.error("Insert custom products error:", error);
      }
    } catch(e) { console.error("Save CP error:", e); } }
  }, [supabase]);
  const [priceLog, setPriceLog] = useState([]);

  const logPriceChange = useCallback((action, details) => {
    const entry = { ts: new Date().toISOString(), action, ...details };
    setPriceLog(prev => {
      const next = [entry, ...prev].slice(0, 200);
      try { localStorage.setItem("price_change_log", JSON.stringify(next)); } catch(e) {}
      return next;
    });
  }, []);

  const saveOV = useCallback(async (o, logEntry) => {
    setProductOverrides(o);
    try { localStorage.setItem("pb_overrides", JSON.stringify(o)); } catch(e) {}
    if (logEntry) logPriceChange(logEntry.action, logEntry);
    if (supabase) { try {
      const { data: ex } = await supabase.from('pricebook_settings').select('id').limit(1).single();
      if (ex) { 
        const {error} = await supabase.from('pricebook_settings').update({product_overrides: o, updated_at: new Date().toISOString()}).eq('id', ex.id); 
        if(error) console.error("Save product overrides error:", error); 
      } else {
        const {error} = await supabase.from('pricebook_settings').insert({product_overrides: o});
        if(error) console.error("Insert product overrides error:", error);
      }
    } catch(e) { console.error("Save OV error:", e); } }
  }, [logPriceChange, supabase]);
  const saveBPO = useCallback((o, logEntry) => {
    setBasePriceOverrides(o);
    try { localStorage.setItem("base_price_overrides", JSON.stringify(o)); } catch(e) {}
    if (logEntry) logPriceChange(logEntry.action, logEntry);
    if (supabase) { (async()=>{ try {
      const { data: ex } = await supabase.from('pricebook_settings').select('id').limit(1).single();
      if (ex) { 
        const {error} = await supabase.from('pricebook_settings').update({base_price_overrides: o, updated_at: new Date().toISOString()}).eq('id', ex.id); 
        if(error) console.error("Save base price overrides error:", error); 
      } else {
        const {error} = await supabase.from('pricebook_settings').insert({base_price_overrides: o});
        if(error) console.error("Insert base price overrides error:", error);
      }
    } catch(e) { console.error("Save BPO error:", e); } })(); }
  }, [logPriceChange, supabase]);
  const flash = (m,t="ok") => { setToast({m,t}); setTimeout(()=>setToast(null),3000); };

  // Merged product list: pre-loaded (with overrides applied) + custom
  const allProducts = useMemo(() => {
    const base = ALL_PRODUCTS.map(p => {
      const ov = productOverrides[p.id];
      return ov ? {...p, ...ov} : p;
    });
    return [...base, ...customProducts];
  }, [customProducts, productOverrides]);

  // Extras lookup using allProducts (with overrides applied)
  const getExtrasForCat = useCallback((cat) => {
    return allProducts.filter(p => {
      const nameUp = p.name.toUpperCase();
      const matches = cat.keywords.some(kw => nameUp.includes(kw.toUpperCase()));
      if (!matches) return false;
      if (cat.excludeKeywords) return !cat.excludeKeywords.some(ek => nameUp.includes(ek.toUpperCase()));
      return true;
    });
  }, [allProducts]);

  const cur = useMemo(() => {
    const c = customers.find(x=>x.id===aCust);
    const p = c && c.projects ? c.projects.find(x=>x.id===aProj) : null;
    const b = p && p.builds ? p.builds.find(x=>x.id===aBuild) : null;
    return {c,p,b};
  },[customers,aCust,aProj,aBuild]);

  const bSub = b => {
    const itemsTotal = (b.items||[]).reduce((s,l) => s + l.qty * l.price + (l.customAmt||0), 0);
    const extrasTotal = (b.extras||[]).reduce((s,x) => s + (x.price||0) * (x.qty||1) + (x.customAmt||0), 0);
    return itemsTotal + extrasTotal;
  };
  const calcDiscounts = (discounts, subtotal) => {
    // v2.6: Process IN ORDER ADDED - each discount applies to remaining after all prior
    let totalSaved = 0;
    let remaining = subtotal;
    (discounts||[]).forEach(d => {
      if (d.type === "percent") {
        const amt = remaining * ((d.amount||0)/100) * (d.count||1);
        const capped = Math.min(amt, remaining);
        totalSaved += capped;
        remaining = Math.max(0, remaining - capped);
      } else {
        const amt = Math.min((d.amount||0) * (d.count||1), remaining);
        totalSaved += amt;
        remaining = Math.max(0, remaining - amt);
      }
    });
    return Math.min(totalSaved, subtotal);
  };
  const calcDiscountBreakdown = (discounts, subtotal) => {
    const breakdown = [];
    let remaining = subtotal;
    (discounts||[]).forEach(d => {
      if (d.type === "percent") {
        const amt = remaining * ((d.amount||0)/100) * (d.count||1);
        const capped = Math.min(amt, remaining);
        breakdown.push({...d, savedAmt: capped, appliedOn: remaining});
        remaining = Math.max(0, remaining - capped);
      } else {
        const amt = Math.min((d.amount||0) * (d.count||1), remaining);
        breakdown.push({...d, savedAmt: amt, appliedOn: remaining});
        remaining = Math.max(0, remaining - amt);
      }
    });
    return breakdown;
  };
  // Debug: verify discount version from browser console by typing: window.testDiscounts()
  if (typeof window !== 'undefined') {
    window.testDiscounts = () => {
      const test = [{id:"tv",name:"TV",type:"flat",amount:2500,count:1},{id:"fv",name:"First Visit",type:"percent",amount:10,count:1},{id:"sm",name:"Social",type:"flat",amount:600,count:1}];
      const bd = calcDiscountBreakdown(test, 37500);
      console.log("RemodelPro v2.6 Discount Test on $37,500:");
      bd.forEach(d => console.log(`  ${d.name}: applied on $${d.appliedOn} => saved $${d.savedAmt.toFixed(2)}`));
      console.log("First Visit should be $3,500 (10% of $35,000). Actual:", bd[1].savedAmt);
      console.log(bd[1].savedAmt === 3500 ? "PASS - v2.6 cascade working" : "FAIL - old grouped logic still running");
      return bd;
    };
    window.RemodelProVersion = "v3.0";
    console.log("%c RemodelPro v3.0 loaded — extras categories updated, lock feature, change orders ", "background:#2dd4a0;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px");
  }

  const bDiscTotal = b => 0; // Discounts now at project level only
  const bTot = b => bSub(b); // Build total is just subtotal (no per-build discounts)
  // Project-level discount calculations
  const pRetail = p => (p.builds||[]).reduce((s,b) => s + bSub(b), 0);
  const pDiscTotal = p => calcDiscounts(p.discounts, pRetail(p));
  const pSold = p => Math.max(0, pRetail(p) - pDiscTotal(p));
  const pSubAfterBuilds = p => pSold(p);
  const pTot = p => pSold(p);

  // Commission constants
  const TV_DISCOUNT = 2500;
  const FINANCE_CLIPS = {"15 Year Financing":0.04, "10 Year Financing":0.015, "1 Year Same as Cash":0.07, "No Financing":0, "":0};

  // Calculate payment amount for a slot (supports % or fixed mode)
  const calcPayAmt = (pt, slot, total) => {
    const mode = pt.payMode || pt[slot+"m"] || "pct"; // global payMode, or per-slot fallback
    const val = pt[slot] || 0;
    return mode === "fixed" ? val : Math.round(total * val / 100 * 100) / 100;
  };

  // Calculate combined payment schedule across all builds (proportional to project sold)
  const calcCombinedPayments = (builds, projRetail, projSold) => {
    const calc = (slot) => builds.reduce((s,b) => {
      const pt = b.payTerms||{p1:25,p2:25,p3:0,p4:50};
      const share = projRetail > 0 ? (bSub(b)/projRetail) : 0;
      const bSold = projSold * share;
      return s + calcPayAmt(pt, slot, bSold);
    }, 0);
    return { signing: calc("p1"), start: calc("p2"), mid: calc("p3"), final2: calc("p4"), hasMid: builds.some(b=>(b.payTerms||{}).useP3) };
  };

  // Calculate commission for a single build within a project context
  const calcBuildCommission = (build, project) => {
    const builds = project.builds || [];
    const projectRetail = pRetail(project);
    const projectSold = pSold(project);

    const buildRetail = bSub(build);
    const buildPct = projectRetail > 0 ? buildRetail / projectRetail : 0;
    const buildSold = Math.round(projectSold * buildPct * 100) / 100;

    const listPrice = Math.max(0, buildRetail - TV_DISCOUNT);
    const parPrice = Math.round(listPrice * 0.85 * 100) / 100;
    const bottomPrice = Math.round(listPrice * 0.75 * 100) / 100;

    // Payment/financing
    const payType = build.payType || "";
    const finType = build.finType || "";
    const finClipPct = FINANCE_CLIPS[finType] || 0;

    // Down payment: p1 amount (% or fixed) of buildSold
    const pt = build.payTerms || {p1:25};
    const downPayment = calcPayAmt(pt, "p1", buildSold);
    const loanAmount = Math.max(0, buildSold - downPayment);
    const financeClip = Math.round(loanAmount * finClipPct * 100) / 100;
    const adjustedSold = Math.round((buildSold - financeClip) * 100) / 100;

    const belowBottom = adjustedSold < bottomPrice;

    // Commission calculation
    let commission = 0;
    let commTier = "";
    if (listPrice <= 0) {
      commission = 0;
      commTier = "No list price";
    } else if (adjustedSold >= parPrice) {
      // At or above par: 10% of par + 25% of overage
      const overage = adjustedSold - parPrice;
      commission = Math.round((parPrice * 0.10 + overage * 0.25) * 100) / 100;
      commTier = "At/Above Par";
    } else {
      // Below par — calculate % under par
      const pctUnder = ((parPrice - adjustedSold) / parPrice) * 100;
      if (pctUnder <= 3) { commission = Math.round(adjustedSold * 0.08 * 100) / 100; commTier = "Under par ≤3% → 8%"; }
      else if (pctUnder <= 6.99) { commission = Math.round(adjustedSold * 0.07 * 100) / 100; commTier = "3.1-6.99% under → 7%"; }
      else if (pctUnder <= 9.99) { commission = Math.round(adjustedSold * 0.06 * 100) / 100; commTier = "7-9.99% under → 6%"; }
      else if (pctUnder <= 13) { commission = Math.round(adjustedSold * 0.05 * 100) / 100; commTier = "10-13% under → 5%"; }
      else if (pctUnder <= 15) { commission = Math.round(adjustedSold * 0.025 * 100) / 100; commTier = "13.1-15% under → 2.5%"; }
      else { commission = 0; commTier = ">15.1% under → 0%"; }
    }

    return {
      buildRetail, buildPct, buildSold, listPrice, parPrice, bottomPrice,
      payType, finType, finClipPct, downPayment, loanAmount, financeClip,
      adjustedSold, belowBottom, commission, commTier,
    };
  };

  const updC = fn => { const n=fn(customers); saveC(n); };
  const updB = fn => { updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.map(b=>b.id!==aBuild?b:fn(b))})})); };

  const getSteps = (type, cfg) => {
    let steps = type==="Full Bathroom Remodel" ? FULL_BATH_STEPS : type==="Wet Area Only" ? WET_AREA_STEPS : type==="Half Bath" ? HALF_BATH_STEPS : type==="Roofing" ? ROOFING_STEPS : KITCHEN_STEPS;
    const isTub = cfg.size && cfg.size.includes("Bathtub");
    return steps.filter(s => {
      if (s.showWhen==="shower" && isTub) return false;
      if (s.showWhen==="bathtub" && !isTub) return false;
      return true;
    });
  };

  const getProds = (step, cfg) => {
    let f = allProducts.filter(p => step.pfx.some(px => p.name.startsWith(px)));
    const k = step.key;
    const sz = cfg.size || "";
    const szDim = sz.split(" ")[0];

    // Brand filter for shower walls
    if (step.brandFilter && cfg.brand) {
      const b = cfg.brand.toLowerCase();
      f = f.filter(p => p.name.toLowerCase().includes(b));
    }

    // Shower wall: filter by size dimension
    if (k === "shower_wall" && szDim) {
      f = f.filter(p => p.name.includes(szDim));
    }

    // Vanity: filter by Single/Double
    if (k === "vanity" && cfg.vanityType) {
      f = f.filter(p => p.name.includes(cfg.vanityType + " Sink") || p.name.toUpperCase().includes("NONE") || p.name.includes("Customer") || p.name.includes("Wall to Wall"));
    }

    // Wall to Wall Vanity: filter by Single/Double
    if (k === "wall_vanity" && cfg.vanityType) {
      f = f.filter(p => p.name.includes(cfg.vanityType + " Sink") || p.name.toUpperCase().includes("NONE") || p.name.includes("Customer"));
    }

    // Shower Pan: match size
    if (k === "shower_pan" && szDim) {
      const panSizeMap = {"36x36":"36x36","60x60":"60x60","60x36":"60x3","48x36":"","60x48":""};
      const match = panSizeMap[szDim] || "";
      if (match) { f = f.filter(p => p.name.includes(match) || p.name.includes("Custom")); }
      else { f = f.filter(p => p.name.includes("Custom")); }
    }

    // Shower Doors: filter by size
    if (k === "shower_doors" && szDim) {
      const doorSizeMap = {"60x60":"60 Inch","60x48":"60 Inch","60x36":"60 Inch","48x36":"48 Inch","36x36":"Custom"};
      const doorSize = doorSizeMap[szDim] || "Custom";
      if (doorSize === "Custom") { f = f.filter(p => p.name.includes("Custom") || p.name.toUpperCase().includes("NONE")); }
      else { f = f.filter(p => p.name.includes(doorSize) || p.name.includes("Custom") || p.name.toUpperCase().includes("NONE")); }
    }

    return f;
  };

  // Get cascading filter options from products for current step
  const getStepFilters = (prods, stepKey) => {
    const sf = wizFilters[stepKey] || {};
    // Exclude None/NA products from filter options
    const real = prods.filter(p => {
      const u = p.name.toUpperCase();
      return !(u.includes("- NONE") || u.includes(", NONE") || u.endsWith("NONE") || u.includes("- NA,") || u.endsWith(", NA") || u.endsWith("- NA"));
    });
    if (real.length === 0) return { f1: null, f2: null, f3: null, filtered: [] };

    // Detect filter labels from products
    const f1Label = real.find(p => p.f1l)?.f1l || "";
    const f2Label = real.find(p => p.f2l)?.f2l || "";
    const f3Label = real.find(p => p.f3l)?.f3l || "";
    if (!f1Label) return { f1: null, f2: null, f3: null, filtered: real };

    // F1 options: all unique values
    const f1Opts = [...new Set(real.filter(p => p.f1v).map(p => p.f1v))].sort();

    // Apply F1 filter
    let after1 = real;
    if (sf.f1) after1 = real.filter(p => p.f1v === sf.f1);

    // F2 options: from products matching F1
    const f2Opts = f2Label ? [...new Set(after1.filter(p => p.f2v).map(p => p.f2v))].sort() : [];

    // Apply F2 filter
    let after2 = after1;
    if (sf.f2 && f2Label) after2 = after1.filter(p => p.f2v === sf.f2);

    // F3 options: from products matching F1+F2
    const f3Opts = f3Label ? [...new Set(after2.filter(p => p.f3v).map(p => p.f3v))].sort() : [];

    // Apply F3 filter
    let filtered = after2;
    if (sf.f3 && f3Label) filtered = after2.filter(p => p.f3v === sf.f3);

    return {
      f1: f1Label ? { label: f1Label, opts: f1Opts, val: sf.f1 || "" } : null,
      f2: f2Label ? { label: f2Label, opts: f2Opts, val: sf.f2 || "" } : null,
      f3: f3Label ? { label: f3Label, opts: f3Opts, val: sf.f3 || "" } : null,
      filtered,
    };
  };

  // Update a cascading filter value, clearing downstream selections
  const setStepFilter = (stepKey, level, val) => {
    const prev = wizFilters[stepKey] || {};
    const next = { ...prev };
    if (level === "f1") { next.f1 = val || ""; next.f2 = ""; next.f3 = ""; }
    else if (level === "f2") { next.f2 = val || ""; next.f3 = ""; }
    else { next.f3 = val || ""; }
    setWizFilters({ ...wizFilters, [stepKey]: next });
  };

  // All steps get a "None - skip" option
  const stepHasNoneOption = () => true;

  const finalizeWiz = () => {
    const items = [];
    const bp = getBasePrice(cur.b.type, wizConfig, basePriceOverrides);
    if (bp > 0) {
      items.push({ id:gid(), productId:"BASE", qty:1, price:bp, cost:0, customAmt:0, note:"", stepKey:"base_price", stepLabel:"Base Package", productName:cur.b.type+" Base — "+(wizConfig.brand||"")+" "+(wizConfig.size||wizConfig.sinkBase||"")+(wizConfig.vanityType?" "+wizConfig.vanityType+" Vanity":"") });
    }
    const steps = getSteps(cur.b.type, wizConfig);
    steps.forEach(s => {
      const sel = wizSel[s.key];
      if (sel && sel.pid !== "NONE") {
        const prod = allProducts.find(p => p.id === sel.pid);
        const cost = prod ? (prod.cost||0) : 0;
        items.push({ id:gid(), productId:sel.pid, qty:sel.qty||1, price:sel.price||0, cost, customAmt:sel.customAmt||0, note:sel.note||"", stepKey:s.key, stepLabel:s.label, productName:sel.pn });
      }
    });
    const updatedBuild = {...cur.b, items, wizConfig, wizSelections:wizSel, status:"configured"};
    updB(b => ({...b, items, wizConfig, wizSelections:wizSel, status:"configured"}));
    // Immediately sync to Supabase (don't wait for debounce)
    if (supabase && cur.b && cur.b.id) {
      sbSyncBuild(updatedBuild);
    }
    flash("Build configured with "+items.length+" items!");
  };

  const createCust = async () => {
    const todayStr = new Date().toISOString().slice(0,10);
    const d=new Date();const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day=d.getDate();const suf=day===1||day===21||day===31?"st":day===2||day===22?"nd":day===3||day===23?"rd":"th";
    const projName = months[d.getMonth()]+" "+day+suf+" "+d.getFullYear();

    if (!supabase) {
      const p={id:gid(),name:projName,status:"active",createdAt:todayStr,jobDate:todayStr,builds:[],discounts:[]};
      const c={id:gid(),...fd,projects:[p]};
      saveC([...customers,c]);setACust(c.id);setAProj(p.id);setModal(null);setFd({});return;
    }
    try {
      const { data: newC, error } = await supabase.from('customers').insert({
        name: fd.name || '', email: fd.email || '', phone: fd.phone || '', address: fd.address || '',
        created_by: user?.id || null, created_by_email: user?.email || '',
      }).select().single();
      if (error) { flash("Error creating customer: " + error.message, "er"); return; }

      // Auto-create project with today's date
      const { data: newP, error: pErr } = await supabase.from('projects').insert({
        customer_id: newC.id, name: projName, status: 'active', discounts: [], job_date: todayStr
      }).select().single();

      const p = newP ? { ...newP, orderedAt: "", jobDate: todayStr, builds: [], discounts: newP.discounts || [] } : { id: gid(), name: projName, status: "active", jobDate: todayStr, builds: [], discounts: [] };
      const c = { ...newC, projects: [p] };
      setCustomers(prev => [c, ...prev]);
      setACust(newC.id); setAProj(p.id); setModal(null); setFd({});
      flash("Customer & project created!");
    } catch(e) { console.error('Create customer error:', e); flash("Error creating customer", "er"); }
  };
  const createProj = async () => {
    const todayStr = new Date().toISOString().slice(0,10);
    if (!supabase) { const p={id:gid(),name:fd.name,status:"active",createdAt:todayStr,jobDate:todayStr,builds:[],discounts:[]};updC(cs=>cs.map(c=>c.id===aCust?{...c,projects:[...c.projects,p]}:c));setAProj(p.id);setModal(null);setFd({});return; }
    try {
      const { data: newP, error } = await supabase.from('projects').insert({
        customer_id: aCust, name: fd.name || '', status: 'active', discounts: [], job_date: todayStr
      }).select().single();
      if (error) { flash("Error creating project: " + error.message, "er"); return; }
      const p = { ...newP, orderedAt: "", jobDate: todayStr, builds: [], discounts: newP.discounts || [] };
      setCustomers(prev => prev.map(c => c.id !== aCust ? c : { ...c, projects: [...(c.projects||[]), p] }));
      setAProj(newP.id); setModal(null); setFd({});
      flash("Project created!");
    } catch(e) { console.error('Create project error:', e); flash("Error creating project", "er"); }
  };
  const createBuild = async () => {
    const defaultPT = {p1:25,p1l:"Due at Signing",p2:25,p2l:"Due at Start",p3:0,p3l:"Due at Midpoint",p4:50,p4l:"Due upon Completion",useP3:false};
    if (!supabase) {
      const b={id:gid(),name:fd.name,type:fd.type||"Full Bathroom Remodel",status:"draft",items:[],extras:[],payType:"",finType:"",payTerms:defaultPT,wizConfig:{},wizSelections:{}};
      updC(cs=>cs.map(c=>c.id===aCust?{...c,projects:c.projects.map(p=>p.id===aProj?{...p,builds:[...p.builds,b]}:p)}:c));
      setABuild(b.id);setWizStep(-1);setWizConfig({});setWizSel({});setView("wizard");setModal(null);setFd({});return;
    }
    try {
      const { data: newB, error } = await supabase.from('builds').insert({
        project_id: aProj, name: fd.name || '', type: fd.type || "Full Bathroom Remodel",
        status: 'draft', items: [], extras: [],
        pay_terms: defaultPT, wiz_config: {}, wiz_selections: {}
      }).select().single();
      if (error) { flash("Error creating build: " + error.message, "er"); return; }
      const b = { ...newB, payTerms: newB.pay_terms, payType: "", finType: "", wizConfig: newB.wiz_config, wizSelections: newB.wiz_selections };
      setCustomers(prev => prev.map(c => c.id !== aCust ? c : {
        ...c, projects: c.projects.map(p => p.id !== aProj ? p : { ...p, builds: [...(p.builds||[]), b] })
      }));
      setABuild(newB.id); setWizStep(-1); setWizConfig({}); setWizSel({}); setView("wizard"); setModal(null); setFd({});
      flash("Build created!");
    } catch(e) { console.error('Create build error:', e); flash("Error creating build", "er"); }
  };
  const [confirmDel, setConfirmDel] = useState(null);
  const deleteBuild = async (buildId) => {
    // Remove from local state immediately
    setCustomers(prev => prev.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.filter(b=>b.id!==buildId)})}));
    if(aBuild===buildId) setABuild(null);
    setConfirmDel(null);
    // Delete from Supabase
    if (supabase) {
      try { await supabase.from('builds').delete().eq('id', buildId); } catch(e) { console.error('Delete build error:', e); }
    }
    flash("Build deleted");
  };
  const openWiz = (ci,pi,bi) => {
    setACust(ci);setAProj(pi);setABuild(bi);
    const c2=customers.find(x=>x.id===ci);const p2=c2&&c2.projects?c2.projects.find(x=>x.id===pi):null;const b2=p2&&p2.builds?p2.builds.find(x=>x.id===bi):null;
    if(b2 && b2.wizConfig && Object.keys(b2.wizConfig).length>0){
      setWizConfig(b2.wizConfig);
      setWizSel(b2.wizSelections||{});
      // Restore saved step position, or start at 0
      setWizStep(typeof b2.wizStep==="number" ? b2.wizStep : 0);
    }
    else{setWizConfig({});setWizSel({});setWizStep(-1);}
    setView("wizard");
  };

  // Auto-save wizard progress as the rep works through steps
  useEffect(() => {
    if (view === "wizard" && aBuild && wizStep >= 0) {
      updB(bl => ({...bl, wizSelections: wizSel, wizStep, wizConfig}));
    }
  }, [wizSel, wizStep]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── BUILD PAYLOAD + WEBHOOK + WORK ORDER ── */

  // Enrich a build's items with full product details for the work order
  const enrichBuildItems = (b) => {
    return (b.items||[]).map(l => {
      const prod = allProducts.find(p => p.id === l.productId);
      return {
        ...l,
        sku: prod ? (prod.sku||"") : "",
        supplier: prod ? mapSupplier(prod.supplier||prod.sup||"") : "",
        description: prod ? (prod.desc||"") : "",
        category: prod ? (prod.cat||"") : "",
        subcategory: prod ? (prod.sub||"") : "",
        cost: l.cost || (prod ? (prod.cost||0) : 0),
        itemType: prod ? (prod.itemType||"Product") : "Product",
      };
    });
  };

  // Build the full webhook payload for CRM
  const buildWebhookPayload = (projectResult) => {
    if (!cur.c || !cur.p) return null;
    const builds = cur.p.builds || [];
    const projectRetailAmt = pRetail(cur.p);
    const projectSoldAmt = pSold(cur.p);
    const projectDiscAmt = pDiscTotal(cur.p);
    const {signing, start, mid, final2, hasMid} = calcCombinedPayments(builds, projectRetailAmt, projectSoldAmt);
    const totalCommission = builds.reduce((s,b) => s + calcBuildCommission(b, cur.p).commission, 0);
    return {
      event: "project_finalized",
      timestamp: new Date().toISOString(),
      customer: {
        id: cur.c.id,
        name: cur.c.name||"",
        email: cur.c.email||"",
        phone: cur.c.phone||"",
        address: cur.c.address||"",
        ghl_contact_id: cur.c.ghl_contact_id||"",
      },
      project: {
        id: cur.p.id,
        name: cur.p.name||"",
        project_result: projectResult||"Approved Order",
        ordered_at: cur.p.orderedAt||"",
        retail_price: Math.round(projectRetailAmt*100)/100,
        total: Math.round(projectSoldAmt*100)/100,
        subtotal: Math.round(projectRetailAmt*100)/100,
        list_price: Math.round(projectRetailAmt*100)/100,
        project_discount: Math.round(projectDiscAmt*100)/100,
        discount_count: calcDiscountBreakdown(cur.p.discounts||[], projectRetailAmt).length,
        project_discounts_detail: JSON.stringify(calcDiscountBreakdown(cur.p.discounts||[], projectRetailAmt).map(d=>({name:d.name,type:d.type,amount:d.amount,count:d.count||1,applied_on:Math.round(d.appliedOn*100)/100,saved:Math.round(d.savedAmt*100)/100}))),
        // Each discount as a drillable field: discount_1_name, discount_1_type, etc.
        ...Object.fromEntries(calcDiscountBreakdown(cur.p.discounts||[], projectRetailAmt).flatMap((d,i) => {
          const n = i+1;
          return [
            ["discount_"+n+"_name", d.name],
            ["discount_"+n+"_type", d.type],
            ["discount_"+n+"_amount", d.amount],
            ["discount_"+n+"_count", d.count||1],
            ["discount_"+n+"_applied_on", Math.round(d.appliedOn*100)/100],
            ["discount_"+n+"_saved", Math.round(d.savedAmt*100)/100],
          ];
        })),
        total_commission: Math.round(totalCommission*100)/100,
        no_demo_reason: projectResult==="No Demo"?(noDemoReason||""):"",
      },
      combined_payment_schedule: {
        due_at_signing: Math.round(signing*100)/100,
        due_at_start: Math.round(start*100)/100,
        due_at_midpoint: hasMid ? Math.round(mid*100)/100 : 0,
        due_upon_completion: Math.round(final2*100)/100,
        has_midpoint_payment: hasMid,
      },
      // How many work orders in this project
      work_order_count: builds.length,
      // Each build as a drillable object: build_1.name, build_1.total, etc.
      ...Object.fromEntries(builds.map((b,i) => {
        const n = i+1;
        const pt = b.payTerms||{p1:25,p2:25,p3:0,p4:50,useP3:false};
        const cm = calcBuildCommission(b, cur.p);
        return ["build_"+n, {
          id: b.id,
          name: b.name,
          type: b.type,
          status: b.status,
          work_order_number: n,
          config: JSON.stringify(b.wizConfig||{}),
          retail_price: Math.round(cm.buildRetail*100)/100,
          total: Math.round(cm.buildSold*100)/100,
          subtotal: Math.round(cm.buildRetail*100)/100,
          build_share_pct: Math.round(cm.buildPct*10000)/100,
          list_price: Math.round(cm.listPrice*100)/100,
          par_price: Math.round(cm.parPrice*100)/100,
          bottom_price: Math.round(cm.bottomPrice*100)/100,
          sold_price: Math.round(cm.buildSold*100)/100,
          adjusted_sold_price: Math.round(cm.adjustedSold*100)/100,
          payment_type: cm.payType,
          financing_type: cm.finType,
          finance_clip: Math.round(cm.financeClip*100)/100,
          down_payment: Math.round(cm.downPayment*100)/100,
          loan_amount: Math.round(cm.loanAmount*100)/100,
          commission: Math.round(cm.commission*100)/100,
          commission_tier: cm.commTier,
          commission_advance: Math.round(((cm.commTier===">15.1% under → 0%"||cm.commTier==="13.1-15% under → 2.5%") ? 0 : cm.commission * 0.25)*100)/100,
          p1_pct: (pt.p1m||"pct")==="pct"?(pt.p1||0):0,
          p1_fixed: (pt.p1m||"pct")==="fixed"?(pt.p1||0):0,
          p1_mode: pt.p1m||"pct",
          p1_amt: Math.round(calcPayAmt(pt,"p1",cm.buildSold)*100)/100,
          p1_label: pt.p1l||"Due at Signing",
          p2_pct: (pt.p2m||"pct")==="pct"?(pt.p2||0):0,
          p2_fixed: (pt.p2m||"pct")==="fixed"?(pt.p2||0):0,
          p2_mode: pt.p2m||"pct",
          p2_amt: Math.round(calcPayAmt(pt,"p2",cm.buildSold)*100)/100,
          p2_label: pt.p2l||"Due at Start",
          p3_pct: pt.useP3&&(pt.p3m||"pct")==="pct"?(pt.p3||0):0,
          p3_fixed: pt.useP3&&(pt.p3m||"pct")==="fixed"?(pt.p3||0):0,
          p3_mode: pt.p3m||"pct",
          p3_amt: pt.useP3?Math.round(calcPayAmt(pt,"p3",cm.buildSold)*100)/100:0,
          p3_label: pt.p3l||"Due at Midpoint",
          has_p3: pt.useP3||false,
          p4_pct: (pt.p4m||"pct")==="pct"?(pt.p4||0):0,
          p4_fixed: (pt.p4m||"pct")==="fixed"?(pt.p4||0):0,
          p4_mode: pt.p4m||"pct",
          p4_amt: Math.round(calcPayAmt(pt,"p4",cm.buildSold)*100)/100,
          p4_label: pt.p4l||"Due upon Completion",
          sow_title: SOW[b.type]?SOW[b.type].title:"",
          sow_guarantee: SOW[b.type]?SOW[b.type].guarantee:"",
        }];
      })),
      // Each work order as a drillable object: work_order_1.build_name, work_order_1.total, etc.
      ...Object.fromEntries(builds.map((b,i) => {
        const n = i+1;
        const enrichedItems = enrichBuildItems(b);
        const allMats = [
          ...enrichedItems.map(l => ({
            item_type: l.itemType||"Product",
            product_id: l.productId,
            name: l.productName||l.stepLabel||"",
            description: l.description||"",
            sku: l.sku||"",
            supplier: l.supplier||"Other Suppliers",
            quantity: l.qty||1,
            unit_price: l.price||0,
            unit_cost: l.cost||0,
            custom_addon: l.customAmt||0,
            line_total: (l.price||0)*(l.qty||1)+(l.customAmt||0),
            work_note: l.note||"",
            step: l.stepLabel||"",
          })),
          ...(b.extras||[]).map(x => {
            const prod = allProducts.find(p=>p.id===x.productId);
            const linkedProd = x.linkedProductId ? allProducts.find(p=>p.id===x.linkedProductId) : null;
            return {
              item_type: prod?(prod.itemType||"Product"):"Product",
              product_id: x.productId||"",
              name: x.name||"",
              description: prod?(prod.desc||""):"",
              sku: prod?(prod.sku||""):"",
              supplier: prod?mapSupplier(prod.supplier||prod.sup||""):"Other Suppliers",
              quantity: x.qty||1,
              unit_price: x.price||0,
              unit_cost: prod?(prod.cost||0):0,
              custom_addon: x.customAmt||0,
              line_total: (x.price||0)*(x.qty||1)+(x.customAmt||0),
              work_note: x.note||"",
              linked_product_id: x.linkedProductId||"",
              linked_product_name: x.linkedProductName||(linkedProd?linkedProd.name:""),
              linked_product_sku: linkedProd?(linkedProd.sku||""):"",
              linked_product_supplier: linkedProd?mapSupplier(linkedProd.supplier||linkedProd.sup||""):"",
              linked_product_price: linkedProd?(linkedProd.price||0):0,
            };
          }),
        ];
        const totalCost = allMats.reduce((s,m) => s + (m.unit_cost||0) * (m.quantity||1), 0);
        const cm2 = calcBuildCommission(b, cur.p);

        // Group by item_type then by supplier
        const materials = allMats.filter(m => m.item_type === "Material");
        const products = allMats.filter(m => m.item_type === "Product");
        const groupBySupplier = (items) => {
          const groups = {};
          items.forEach(item => {
            const sup = item.supplier || "Other Suppliers";
            if (!groups[sup]) groups[sup] = [];
            groups[sup].push(item);
          });
          return groups;
        };
        const materialsBySupplier = groupBySupplier(materials);
        const productsBySupplier = groupBySupplier(products);

        return ["work_order_"+n, {
          work_order_number: n,
          work_order_label: "Work Order " + n,
          build_id: b.id,
          build_name: b.name,
          build_type: b.type,
          retail_total: Math.round(bSub(b)*100)/100,
          sold_total: Math.round(cm2.buildSold*100)/100,
          total: Math.round(cm2.buildSold*100)/100,
          total_cost: Math.round(totalCost*100)/100,
          material_count: materials.length,
          product_count: products.length,
          total_item_count: allMats.length,
          materials_and_products: JSON.stringify(allMats),
          materials_by_supplier: JSON.stringify(materialsBySupplier),
          products_by_supplier: JSON.stringify(productsBySupplier),
          // Flat text format for GHL/GPT parsing
          materials_text: materials.map(m => m.name + " | Qty: " + m.quantity + " | " + m.supplier + (m.work_note ? " | Note: " + m.work_note : "")).join("\n"),
          products_text: products.map(m => m.name + " | Qty: " + m.quantity + " | " + m.supplier + (m.work_note ? " | Note: " + m.work_note : "")).join("\n"),
          all_items_text: allMats.map(m => m.name + " | Qty: " + m.quantity + " | $" + m.unit_price + " | " + m.supplier + (m.work_note ? " | Note: " + m.work_note : "")).join("\n"),
          // Per-supplier flat fields
          ...Object.fromEntries(Object.keys({...materialsBySupplier,...productsBySupplier}).sort().flatMap(sup => {
            const supKey = sup.toLowerCase().replace(/[^a-z0-9]/g,"_");
            const supItems = [...(materialsBySupplier[sup]||[]),...(productsBySupplier[sup]||[])];
            return [
              ["supplier_"+supKey+"_items", supItems.map(m => m.name + " | Qty: " + m.quantity + (m.work_note ? " | Note: " + m.work_note : "")).join("\n")],
              ["supplier_"+supKey+"_count", supItems.length],
            ];
          })),
          supplier_summary: JSON.stringify(Object.keys({...materialsBySupplier,...productsBySupplier}).sort().map(sup => ({
            supplier: sup,
            materials: (materialsBySupplier[sup]||[]).length,
            products: (productsBySupplier[sup]||[]).length,
            total_items: (materialsBySupplier[sup]||[]).length + (productsBySupplier[sup]||[]).length,
          }))),
        }];
      })),
      // Each order_details as a drillable object: order_details_1.build_name, etc.
      ...Object.fromEntries(builds.map((b,i) => {
        const n = i+1;
        const items = [
          ...(b.items||[]).filter(l=>l.productId!=="NONE").map(l => ({
            name: l.productName||l.stepLabel||"",
            quantity: l.qty||1,
            work_note: l.note||"",
          })),
          ...(b.extras||[]).map(x => ({
            name: x.name||"",
            quantity: x.qty||1,
            work_note: x.note||"",
          })),
        ];
        return ["order_details_"+n, {
          build_name: b.name,
          build_type: b.type,
          work_order_number: n,
          items: JSON.stringify(items),
        }];
      })),
    };
  };

  // Send webhook to CRM (approve order)
  const sendToGHL = async (projectResult) => {
    if (!ghl.webhookUrl) {
      flash("No webhook URL configured. Ask your admin to set up integrations.", "er");
      return;
    }
    const payload = buildWebhookPayload(projectResult||"Approved Order");
    if (!payload) { flash("No project data to send", "er"); return; }
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch(ghl.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const isApprove = projectResult === "Approved Order" || !projectResult;
        setSendResult({ok:true, msg:(isApprove?"Order approved! ":"Change order submitted! ") + (cur.p.builds||[]).length + " work order(s) submitted successfully."});
        flash(isApprove?"Order approved & submitted!":"Change order submitted!");
        // Record orderedAt date on first approval and persist immediately
        if (isApprove && cur.p) {
          const orderDate = cur.p.orderedAt || new Date().toISOString();
          updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,orderedAt:orderDate,status:"sent",locked:true,result:"Sold",resultDate:orderDate})}));
          if (supabase) {
            try { await supabase.from('projects').update({
              status:'sent', 
              locked: true,
              ordered_at: orderDate,
              result: 'Sold',
              result_date: orderDate,
              discounts: cur.p.discounts || [],
              job_date: cur.p.jobDate || null,
              updated_at: new Date().toISOString()
            }).eq('id', cur.p.id); } catch(e){ console.error("Save project on approve error:", e); }
            // Also force-sync all builds
            for (const build of (cur.p.builds||[])) {
              try { await supabase.from('builds').update({
                items: build.items||[], extras: build.extras||[],
                pay_terms: {...(build.payTerms||{}), payType: build.payType||"", finType: build.finType||""},
                wiz_config: {...(build.wizConfig||{}), wizStep: build.wizStep},
                wiz_selections: build.wizSelections||{},
                status: build.status||"configured",
                updated_at: new Date().toISOString()
              }).eq('id', build.id); } catch(e){}
            }
          }
        }
      } else {
        const txt = await res.text().catch(()=>"");
        setSendResult({ok:false, msg:"Webhook returned " + res.status + ". " + txt.slice(0,200)});
        flash("Webhook error: " + res.status, "er");
      }
    } catch(e) {
      setSendResult({ok:false, msg:"Network error: " + e.message});
      flash("Failed to send: " + e.message, "er");
    }
    setSending(false);
  };

  /* ── WORK ORDER PREVIEW (installer-facing) ── */
  const renderWorkOrder = (b, idx) => {
    const enrichedItems = enrichBuildItems(b);
    const pt = b.payTerms||{p1:25,p2:25,p3:0,p4:50,useP3:false};
    const bt = bSub(b);
    return <div key={b.id} style={{background:"#fff",color:"#1a1a1a",borderRadius:8,padding:20,marginBottom:12,fontSize:11}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,paddingBottom:8,borderBottom:"2px solid #1a1a1a"}}>
        <div>
          <div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#888"}}>Work Order #{idx+1}</div>
          <div style={{fontSize:16,fontWeight:700}}>{b.name}</div>
          <div style={{fontSize:10,color:"#666"}}>{b.type} {b.wizConfig&&b.wizConfig.brand?"\u00b7 "+b.wizConfig.brand:""} {b.wizConfig&&b.wizConfig.size?"\u00b7 "+b.wizConfig.size:""}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#888"}}>Build Retail</div>
          <div style={{fontSize:18,fontWeight:700}}>{fmt(bt)}</div>
        </div>
      </div>
      {/* Customer info */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12,padding:8,background:"#f8f8f6",borderRadius:6,fontSize:10}}>
        <div><span style={{fontWeight:600}}>Customer:</span> {cur.c?cur.c.name:""}</div>
        <div><span style={{fontWeight:600}}>Phone:</span> {cur.c?cur.c.phone:""}</div>
        <div style={{gridColumn:"1/-1"}}><span style={{fontWeight:600}}>Address:</span> {cur.c?cur.c.address:""}</div>
      </div>
      {/* Materials table - FULL details for installer */}
      <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#888",marginBottom:4}}>Materials {"&"} Products</div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:10,marginBottom:10}}>
        <thead><tr style={{background:"#f0f0f0"}}>
          <th style={{textAlign:"left",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase"}}>Item</th>
          <th style={{textAlign:"left",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase",width:80}}>SKU</th>
          <th style={{textAlign:"left",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase",width:70}}>Supplier</th>
          <th style={{textAlign:"center",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase",width:30}}>Qty</th>
          <th style={{textAlign:"right",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase",width:65}}>Unit $</th>
          <th style={{textAlign:"right",padding:"4px 6px",fontSize:8,fontWeight:700,textTransform:"uppercase",width:65}}>Total</th>
        </tr></thead>
        <tbody>
          {enrichedItems.map(l=><tr key={l.id} style={{borderBottom:"1px solid #eee"}}>
            <td style={{padding:"4px 6px",verticalAlign:"top"}}>
              <div style={{fontWeight:600}}>{l.productName||l.stepLabel||"Item"}</div>
              {l.description&&<div style={{fontSize:8,color:"#888",maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.description}</div>}
              {l.note&&<div style={{fontSize:8,color:"#c55",fontStyle:"italic"}}>Note: {l.note}</div>}
            </td>
            <td style={{padding:"4px 6px",fontSize:9,color:"#666"}}>{l.sku||"-"}</td>
            <td style={{padding:"4px 6px",fontSize:9,color:"#666"}}>{l.supplier||"-"}</td>
            <td style={{padding:"4px 6px",textAlign:"center"}}>{l.qty}</td>
            <td style={{padding:"4px 6px",textAlign:"right",fontVariantNumeric:"tabular-nums"}}>{fmt(l.price)}</td>
            <td style={{padding:"4px 6px",textAlign:"right",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt((l.price*(l.qty||1))+(l.customAmt||0))}</td>
          </tr>)}
          {/* Extras */}
          {b.extras&&b.extras.length>0&&<tr><td colSpan={6} style={{padding:"8px 6px 4px",fontSize:9,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".06em",background:"#fafaf8"}}>Additional Work / Extras</td></tr>}
          {(b.extras||[]).map(x=>{const prod=allProducts.find(p=>p.id===x.productId);const lp=x.linkedProductId?allProducts.find(p=>p.id===x.linkedProductId):null;return <tr key={x.id} style={{borderBottom:"1px solid #eee"}}>
            <td style={{padding:"4px 6px",verticalAlign:"top"}}>
              <div style={{fontWeight:600}}>{x.name}</div>
              {lp&&<div style={{fontSize:9,color:"#2a6bcc",fontWeight:500}}>→ {lp.name}</div>}
              {x.note&&<div style={{fontSize:8,color:"#c55",fontStyle:"italic"}}>Note: {x.note}</div>}
            </td>
            <td style={{padding:"4px 6px",fontSize:9,color:"#666"}}>{lp?(lp.sku||"-"):prod?(prod.sku||"-"):"-"}</td>
            <td style={{padding:"4px 6px",fontSize:9,color:"#666"}}>{lp?(lp.supplier||lp.sup||"-"):prod?(prod.supplier||"-"):"-"}</td>
            <td style={{padding:"4px 6px",textAlign:"center"}}>{x.qty||1}</td>
            <td style={{padding:"4px 6px",textAlign:"right",fontVariantNumeric:"tabular-nums"}}>{fmt(x.price)}</td>
            <td style={{padding:"4px 6px",textAlign:"right",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt((x.price*(x.qty||1))+(x.customAmt||0))}</td>
          </tr>})}
        </tbody>
      </table>
      {/* Payment */}
      <div style={{display:"grid",gridTemplateColumns:pt.useP3?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",gap:8,padding:8,background:"#f0f7ff",borderRadius:6,marginTop:8}}>
        <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>At Signing</div><div style={{fontSize:13,fontWeight:700}}>{fmt(calcPayAmt(pt,"p1",bt))}</div><div style={{fontSize:8,color:"#888"}}>{(pt.p1m||"pct")==="fixed"?"Fixed":""+pt.p1+"%"}</div></div>
        <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>At Start</div><div style={{fontSize:13,fontWeight:700}}>{fmt(calcPayAmt(pt,"p2",bt))}</div><div style={{fontSize:8,color:"#888"}}>{(pt.p2m||"pct")==="fixed"?"Fixed":""+pt.p2+"%"}</div></div>
        {pt.useP3&&<div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Midpoint</div><div style={{fontSize:13,fontWeight:700}}>{fmt(calcPayAmt(pt,"p3",bt))}</div><div style={{fontSize:8,color:"#888"}}>{(pt.p3m||"pct")==="fixed"?"Fixed":""+pt.p3+"%"}</div></div>}
        <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Completion</div><div style={{fontSize:13,fontWeight:700}}>{fmt(calcPayAmt(pt,"p4",bt))}</div><div style={{fontSize:8,color:"#888"}}>{(pt.p4m||"pct")==="fixed"?"Fixed":""+pt.p4+"%"}</div></div>
      </div>
    </div>;
  };

  /* ── DEBOUNCED INPUT (prevents focus loss in panels that re-render on every change) ── */
  const DInput = ({value, onChange, type, ...props}) => {
    const [local, setLocal] = useState(value);
    const ref = useRef(null);
    useEffect(() => { if (ref.current !== document.activeElement) setLocal(value); }, [value]);
    const commit = () => {
      if (type === "number") onChange(parseFloat(local) || 0);
      else onChange(local || "");
    };
    return <input ref={ref} {...props} type={type} value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === "Enter") commit(); }}/>;
  };

  /* ── DISCOUNT PANEL ── */
  const DiscountPanel = ({discounts, subtotal, onUpdate, level}) => {
    const discs = discounts || [];
    const totalSaved = calcDiscounts(discs, subtotal);
    const addPreset = (preset) => {
      const existing = discs.find(d => d.id === preset.id);
      if (existing) {
        onUpdate(discs.map(d => d.id === preset.id ? {...d, count: (d.count||1) + 1} : d));
      } else {
        onUpdate([...discs, {...preset, count: 1}]);
      }
    };
    const addCustom = (num) => {
      const cid = "custom_" + num + "_" + gid();
      onUpdate([...discs, {id: cid, name: "Custom Discount " + num, type: "flat", amount: 0, count: 1, custom: true}]);
    };
    const updDisc = (id, field, val) => {
      onUpdate(discs.map(d => d.id === id ? {...d, [field]: val} : d));
    };
    const rmDisc = (id) => onUpdate(discs.filter(d => d.id !== id));
    const customCount = discs.filter(d => d.custom).length;

    return (<div className="cd" style={{border:"1px solid var(--gdd)",background:"rgba(212,164,74,.03)"}}>
      <div className="cd-h"><div className="cd-t" style={{color:"var(--gd)"}}>{level} Discounts</div>
        {totalSaved > 0 && <div className="nm" style={{fontSize:13,fontWeight:700,color:"var(--ok)"}}>-{fmt(totalSaved)}</div>}</div>
      {/* Active discounts */}
      {discs.length > 0 && <div style={{marginBottom:10}}>
        {discs.map(d => {
          // Get cascading amount from breakdown
          const bd = calcDiscountBreakdown(discs, subtotal);
          const bdItem = bd.find(x => x.id === d.id);
          const amt = bdItem ? bdItem.savedAmt : 0;
          return <div key={d.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 0",borderBottom:"1px solid var(--bd)"}}>
            <div style={{flex:1,minWidth:0}}>
              {d.custom ? <DInput className="inp is" value={d.name} onChange={v=>updDisc(d.id,"name",v)} style={{width:160,marginRight:6}} placeholder="Discount name"/> : <span style={{fontSize:11,fontWeight:600}}>{d.name}</span>}
              <span className={"tg "+(d.type==="percent"?"tbl":"tw")} style={{marginLeft:4}}>{d.type==="percent"?d.amount+"%":fmt(d.amount)}</span>
            </div>
            {d.custom && <DInput className="inp is" type="number" step="0.01" value={d.amount||""} onChange={v=>updDisc(d.id,"amount",v)} style={{width:80}} placeholder="Amount"/>}
            <div style={{display:"flex",alignItems:"center",gap:2}}>
              <button className="bg2" onClick={()=>updDisc(d.id,"count",Math.max(1,(d.count||1)-1))} style={{fontSize:14,padding:"0 4px",lineHeight:1}}>-</button>
              <input className="inp is" type="number" min="1" value={d.count||1} onChange={e=>updDisc(d.id,"count",Math.max(1,parseInt(e.target.value)||1))} style={{width:36,textAlign:"center"}}/>
              <button className="bg2" onClick={()=>updDisc(d.id,"count",(d.count||1)+1)} style={{fontSize:14,padding:"0 4px",lineHeight:1}}>+</button>
            </div>
            <div className="nm" style={{fontSize:11,fontWeight:600,color:"var(--ok)",width:80,textAlign:"right"}}>-{fmt(amt)}</div>
            <button className="bg2" onClick={()=>rmDisc(d.id)} style={{color:"var(--er)"}}><I name="trash" size={12}/></button>
          </div>;
        })}
      </div>}
      {/* Add preset buttons */}
      <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Add Discount</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>
        {DISC_PRESETS.filter(p=>p.type==="flat").map(p => <button key={p.id} className="btn bs" onClick={()=>addPreset(p)} style={{fontSize:9}}>
          {p.name} <span style={{color:"var(--ok)",marginLeft:2}}>-{fmt(p.amount)}</span></button>)}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>
        {DISC_PRESETS.filter(p=>p.type==="percent").map(p => <button key={p.id} className="btn bs" onClick={()=>addPreset(p)} style={{fontSize:9}}>
          {p.name} <span style={{color:"var(--a2)",marginLeft:2}}>-{p.amount}%</span></button>)}
      </div>
      {customCount < 2 && <button className="btn bs" onClick={()=>addCustom(customCount+1)} style={{fontSize:9,borderStyle:"dashed"}}>
        <I name="plus" size={10}/> Custom Discount</button>}
      {/* Summary */}
      {discs.length > 0 && (()=>{
        const bd = calcDiscountBreakdown(discs, subtotal);
        const hasPercentAfterFlat = bd.some((x,i) => x.type==="percent" && i > 0);
        return <div style={{marginTop:8,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
          {hasPercentAfterFlat && <div style={{fontSize:9,color:"var(--t3)",marginBottom:4,fontStyle:"italic"}}>Percentage discounts cascade off remaining subtotal after prior discounts</div>}
          {bd.filter(x=>x.type==="percent").map(x => <div key={x.id} style={{fontSize:9,color:"var(--t3)",marginBottom:1}}>{x.name} ({x.amount}%) applied on {fmt(x.appliedOn)} = -{fmt(x.savedAmt)}</div>)}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
            <div style={{fontSize:10,color:"var(--t2)"}}>Subtotal: {fmt(subtotal)} | After Discounts: <span style={{color:"var(--a2)",fontWeight:700}}>{fmt(Math.max(0,subtotal-totalSaved))}</span></div>
          </div>
        </div>;
      })()}
    </div>);
  };

  /* ── EXTRAS PANEL ── */
  // Extras that require selecting a linked product from the catalog
  const EXTRA_LINKED_PRODUCTS = {
    "REPLACE TOILET": {label:"Select Toilet",pfx:["Toilets"]},
    "REPLACE VANITY LIGHTS": {label:"Select Vanity Light",pfx:["Lighting"]},
    "REPLACE MIRROR": {label:"Select Vanity Mirror",pfx:["Vanity Mirror"]},
    "REPLACE VANITY FAUCETS": {label:"Select Vanity Faucet",pfx:["Vanity Faucets"]},
    "REPLACE VANITY": {label:"Select Vanity",pfx:["Vanities"]},
    "INSTALLING A LIGHTED MIRROR": {label:"Select Lighted Mirror",pfx:["Vanity Mirror"]},
    "INSTALL NON EXISTING VANITY LIGHT": {label:"Select Vanity Light",pfx:["Lighting"]},
    "ADDITIONAL SHOWER DIVERTER": {label:"Select Shower Diverter",pfx:["Shower Diverter Trim Kits"]},
    "BATHROOM FLOOR TILE": {label:"Select Floor Tile",pfx:["Luxury Vinyl Tile"]},
    "INSTALL NON EXISTING POT FILLER": {label:"Select Pot Filler",pfx:["POT FILLERS"]},
    "INSTALL NON EXISTING LIGHT": {label:"Select Kitchen Light",pfx:["KITCHEN LIGHTING"]},
  };
  const getLinkedProductCat = (extraName) => {
    const upper = (extraName||"").toUpperCase();
    for (const [key, val] of Object.entries(EXTRA_LINKED_PRODUCTS)) {
      if (upper.startsWith(key)) return val;
    }
    return null;
  };
  const getLinkedProducts = (cat) => {
    if (!cat) return [];
    return allProducts.filter(p => cat.pfx.some(pfx => p.name.toUpperCase().startsWith(pfx.toUpperCase())));
  };

  const ExtrasPanel = ({extras, onUpdate, buildType}) => {
    const items = extras || [];
    const [openCat, setOpenCat] = useState(null);
    const [extSearch, setExtSearch] = useState("");
    const [browseSubKey, setBrowseSubKey] = useState(null);
    const [browseFilters, setBrowseFilters] = useState({});
    const extTotal = items.reduce((s,x) => s + (x.price * (x.qty||1)) + (x.customAmt||0), 0);
    const cats = buildType ? getExtrasCatsForType(buildType) : ALL_EXTRAS_CATS;

    const addExtra = (product) => {
      const existing = items.find(x => x.productId === product.id);
      if (existing) {
        onUpdate(items.map(x => x.productId === product.id ? {...x, qty: (x.qty||1) + 1} : x));
      } else {
        onUpdate([...items, {id: gid(), productId: product.id, name: product.name, price: product.price, qty: 1, customAmt: 0, note: ""}]);
      }
    };
    const updExtra = (id, field, val) => onUpdate(items.map(x => x.id === id ? {...x, [field]: val} : x));
    const updExtraMulti = (id, updates) => onUpdate(items.map(x => x.id === id ? {...x, ...updates} : x));
    const rmExtra = (id) => onUpdate(items.filter(x => x.id !== id));

    return (<div className="cd" style={{border:"1px solid rgba(245,166,35,.2)",background:"rgba(245,166,35,.03)"}}>
      <div className="cd-h"><div className="cd-t" style={{color:"var(--wn)"}}>Extras / Add-Ons</div>
        {extTotal > 0 && <div className="nm" style={{fontSize:13,fontWeight:700,color:"var(--wn)"}}>{fmt(extTotal)}</div>}</div>

      {/* Active extras */}
      {items.length > 0 && <div style={{marginBottom:10}}>
        {items.map(x => { const prod = allProducts.find(p=>p.id===x.productId); const linkedCat = getLinkedProductCat(x.name); const linkedProds = getLinkedProducts(linkedCat); return <div key={x.id} style={{padding:"8px 0",borderBottom:"1px solid var(--bd)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,fontWeight:600,wordBreak:"break-word"}}>{x.name}</div>
              {prod&&prod.desc&&<div style={{fontSize:9,color:"var(--t2)",marginTop:2,wordBreak:"break-word",lineHeight:1.4}}>{prod.desc}</div>}
            </div>
            <button className="bg2" style={{color:"var(--er)",flexShrink:0,marginLeft:6}} onClick={()=>rmExtra(x.id)}><I name="trash" size={11}/></button>
          </div>
          {linkedCat&&linkedProds.length>0&&(()=>{
            // Filterable linked product picker with cascading filters
            const real = linkedProds.filter(p => {
              const u = p.name.toUpperCase();
              return !(u.includes("- NONE")||u.endsWith("NONE")||u.includes(", NONE")||u.includes("- NA,")||u.endsWith(", NA")||u.endsWith("- NA"));
            });
            const extFilters = x.extFilters || {};
            const f1Label = real.find(p=>p.f1l)?.f1l||"";
            const f2Label = real.find(p=>p.f2l)?.f2l||"";
            const f3Label = real.find(p=>p.f3l)?.f3l||"";
            const f1Opts = f1Label ? [...new Set(real.filter(p=>p.f1v).map(p=>p.f1v))].sort() : [];
            let after1 = real; if(extFilters.f1) after1 = real.filter(p=>p.f1v===extFilters.f1);
            const f2Opts = f2Label ? [...new Set(after1.filter(p=>p.f2v).map(p=>p.f2v))].sort() : [];
            let after2 = after1; if(extFilters.f2&&f2Label) after2 = after1.filter(p=>p.f2v===extFilters.f2);
            const f3Opts = f3Label ? [...new Set(after2.filter(p=>p.f3v).map(p=>p.f3v))].sort() : [];
            let filtered = after2; if(extFilters.f3&&f3Label) filtered = after2.filter(p=>p.f3v===extFilters.f3);
            // Search within filtered
            const srch = extFilters.search||"";
            if(srch) filtered = filtered.filter(p=>p.name.toLowerCase().includes(srch.toLowerCase()));
            const setEF = (field,val) => {
              const next = {...extFilters, [field]:val};
              if(field==="f1"){next.f2="";next.f3="";}
              if(field==="f2"){next.f3="";}
              updExtra(x.id,"extFilters",next);
            };
            const hasFilters = f1Label && f1Opts.length > 1;

            return <div style={{marginTop:4,marginBottom:4,padding:"6px 8px",background:"rgba(45,212,160,.04)",border:"1px solid rgba(45,212,160,.15)",borderRadius:"var(--r)"}}>
              <div style={{fontSize:10,fontWeight:600,color:"var(--ok)",marginBottom:4}}>{linkedCat.label}</div>
              {hasFilters&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:4}}>
                {f1Label&&f1Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:100,fontSize:11}} value={extFilters.f1||""} onChange={e=>setEF("f1",e.target.value)}>
                  <option value="">All {f1Label}s ({f1Opts.length})</option>
                  {f1Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {f2Label&&f2Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:100,fontSize:11}} value={extFilters.f2||""} onChange={e=>setEF("f2",e.target.value)}>
                  <option value="">All {f2Label}s ({f2Opts.length})</option>
                  {f2Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {f3Label&&f3Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:100,fontSize:11}} value={extFilters.f3||""} onChange={e=>setEF("f3",e.target.value)}>
                  <option value="">All {f3Label}s ({f3Opts.length})</option>
                  {f3Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {(extFilters.f1||extFilters.f2||extFilters.f3)&&<button className="bg2" style={{fontSize:9,color:"var(--a2)"}} onClick={()=>updExtra(x.id,"extFilters",{})}>Clear</button>}
              </div>}
              <input className="inp is" placeholder={"Search "+linkedCat.label.replace("Select ","")+"..."} value={srch} onChange={e=>setEF("search",e.target.value)} style={{marginBottom:4,fontSize:11}}/>
              <div style={{fontSize:9,color:"var(--t3)",marginBottom:2}}>{filtered.length} products</div>
              <div style={{maxHeight:160,overflowY:"auto"}}>
                {filtered.map(p=>{
                  const isSel = x.linkedProductId===p.id;
                  return <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"3px 0",borderBottom:"1px solid var(--bd)",background:isSel?"rgba(45,212,160,.08)":"transparent"}}>
                    <div style={{flex:1,minWidth:0,fontSize:10,fontWeight:isSel?600:400,wordBreak:"break-word"}}>{p.name}</div>
                    <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                      <span className="nm" style={{fontSize:9,color:"var(--t2)"}}>{p.price>0?fmt(p.price):"Incl."}</span>
                      <button className={"btn bs "+(isSel?"bo":"bp")} style={{fontSize:8,padding:"2px 6px"}} onClick={()=>{
                        updExtraMulti(x.id, {linkedProductId: p.id, linkedProductName: p.name});
                      }}>{isSel?"Selected":"Select"}</button>
                    </div>
                  </div>;
                })}
              </div>
              {x.linkedProductName&&<div style={{fontSize:9,color:"var(--ok)",marginTop:3,fontWeight:600}}>Selected: {x.linkedProductName}</div>}
            </div>;
          })()}
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",gap:2}}>
              <button className="bg2" onClick={()=>updExtra(x.id,"qty",Math.max(1,(x.qty||1)-1))} style={{fontSize:14,padding:"0 4px",lineHeight:1}}>-</button>
              <DInput className="inp is" type="number" min="1" value={x.qty||1} onChange={v=>updExtra(x.id,"qty",Math.max(1,v||1))} style={{width:40,textAlign:"center"}}/>
              <button className="bg2" onClick={()=>updExtra(x.id,"qty",(x.qty||1)+1)} style={{fontSize:14,padding:"0 4px",lineHeight:1}}>+</button>
            </div>
            <div style={{fontSize:10,color:"var(--t2)"}}>x</div>
            <div className="nm" style={{fontSize:11,fontWeight:600,width:70,textAlign:"right"}}>{fmt(x.price)}</div>
            <DInput className="inp is" type="number" step="0.01" placeholder="+$" value={x.customAmt||""} onChange={v=>updExtra(x.id,"customAmt",v)} style={{width:60}}/>
            <div className="nm" style={{fontSize:11,fontWeight:700,color:"var(--wn)",minWidth:70,textAlign:"right"}}>{fmt(x.price*(x.qty||1)+(x.customAmt||0))}</div>
          </div>
          <DInput className="inp is" placeholder="Work note (optional)..." value={x.note||""} onChange={v=>updExtra(x.id,"note",v)} style={{marginTop:6}}/>
        </div>;})}
      </div>}

      {/* Category browser for extras */}
      <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Add Extras</div>
      {!openCat ? (
        <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
          {cats.map(c => {
            const count = getExtrasForCat(c).length;
            return <button key={c.key} className="btn bs" onClick={()=>{setOpenCat(c.key);setExtSearch("")}} style={{fontSize:9}}>
              {c.label} <span style={{color:"var(--t2)",marginLeft:2}}>({count})</span></button>;
          })}
          {/* Browse full category catalog */}
          {(()=>{
            const catName = buildType && (buildType.includes("Bathroom")||buildType.includes("Wet")||buildType==="Half Bath") ? "Bathroom" : buildType && buildType.includes("Kitchen") ? "Kitchen" : null;
            if (!catName) return null;
            const subs = PB_CATS[catName] || [];
            return <button className="btn bs" onClick={()=>{setOpenCat("_browse_"+catName);setExtSearch("")}} style={{fontSize:9,borderColor:"var(--a2)",color:"var(--a2)"}}>
              Browse {catName} Products <span style={{color:"var(--t2)",marginLeft:2}}>({subs.length} categories)</span></button>;
          })()}
        </div>
      ) : openCat && openCat.startsWith("_browse_") ? (()=>{
        const catName = openCat.replace("_browse_","");
        const subs = PB_CATS[catName] || [];
        const browseSub = browseSubKey ? subs.find(s=>s.key===browseSubKey) : null;

        return <div>
          <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:6}}>
            <button className="btn bs" onClick={()=>{setOpenCat(null);setBrowseSubKey(null)}}><I name="arrowL" size={10}/> Back</button>
            <span style={{fontSize:11,fontWeight:600,color:"var(--a2)"}}>Browse {catName} Products</span>
          </div>
          {!browseSubKey ? (
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
              {subs.map(sub => {
                const count = allProducts.filter(p => sub.pfx.some(px => p.name.startsWith(px))).length;
                return <button key={sub.key} className="btn bs" onClick={()=>{setBrowseSubKey(sub.key);setBrowseFilters({});setExtSearch("")}} style={{fontSize:9}}>
                  {sub.label} <span style={{color:"var(--t2)",marginLeft:2}}>({count})</span></button>;
              })}
            </div>
          ) : (()=>{
            // Get all products for this subcategory
            const allSubProds = allProducts.filter(p => browseSub.pfx.some(px => p.name.startsWith(px)));
            // Filter out None/NA
            const real = allSubProds.filter(p => {
              const u = p.name.toUpperCase();
              return !(u.includes("- NONE")||u.endsWith("NONE")||u.includes(", NONE")||u.includes("- NA,")||u.endsWith(", NA")||u.endsWith("- NA"));
            });
            // Cascading filters
            const bf = browseFilters;
            const f1Label = real.find(p=>p.f1l)?.f1l||"";
            const f2Label = real.find(p=>p.f2l)?.f2l||"";
            const f3Label = real.find(p=>p.f3l)?.f3l||"";
            const f1Opts = f1Label ? [...new Set(real.filter(p=>p.f1v).map(p=>p.f1v))].sort() : [];
            let after1 = real; if(bf.f1) after1 = real.filter(p=>p.f1v===bf.f1);
            const f2Opts = f2Label ? [...new Set(after1.filter(p=>p.f2v).map(p=>p.f2v))].sort() : [];
            let after2 = after1; if(bf.f2&&f2Label) after2 = after1.filter(p=>p.f2v===bf.f2);
            const f3Opts = f3Label ? [...new Set(after2.filter(p=>p.f3v).map(p=>p.f3v))].sort() : [];
            let filtered = after2; if(bf.f3&&f3Label) filtered = after2.filter(p=>p.f3v===bf.f3);
            // Search
            if(extSearch) filtered = filtered.filter(p=>p.name.toLowerCase().includes(extSearch.toLowerCase()));
            const hasFilters = f1Label && f1Opts.length > 1;
            const setBF = (field, val) => {
              const next = {...bf, [field]:val};
              if(field==="f1"){next.f2="";next.f3="";}
              if(field==="f2"){next.f3="";}
              setBrowseFilters(next);
            };

            return <div>
              <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:4}}>
                <button className="bg2" onClick={()=>{setBrowseSubKey(null);setBrowseFilters({})}}><I name="arrowL" size={10}/></button>
                <span style={{fontSize:11,fontWeight:600}}>{browseSub?.label}</span>
                <span style={{fontSize:9,color:"var(--t3)"}}>({filtered.length} of {real.length})</span>
              </div>
              {hasFilters&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:4}}>
                {f1Label&&f1Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:90,fontSize:11}} value={bf.f1||""} onChange={e=>setBF("f1",e.target.value)}>
                  <option value="">All {f1Label}s ({f1Opts.length})</option>
                  {f1Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {f2Label&&f2Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:90,fontSize:11}} value={bf.f2||""} onChange={e=>setBF("f2",e.target.value)}>
                  <option value="">All {f2Label}s ({f2Opts.length})</option>
                  {f2Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {f3Label&&f3Opts.length>1&&<select className="inp is" style={{flex:1,minWidth:90,fontSize:11}} value={bf.f3||""} onChange={e=>setBF("f3",e.target.value)}>
                  <option value="">All {f3Label}s ({f3Opts.length})</option>
                  {f3Opts.map(o=><option key={o} value={o}>{o}</option>)}</select>}
                {(bf.f1||bf.f2||bf.f3)&&<button className="bg2" style={{fontSize:9,color:"var(--a2)"}} onClick={()=>setBrowseFilters({})}>Clear</button>}
              </div>}
              <input className="inp is" placeholder={"Search "+browseSub?.label+"..."} value={extSearch} onChange={e=>setExtSearch(e.target.value)} style={{marginBottom:4}}/>
              <div style={{maxHeight:200,overflowY:"auto"}}>
                {filtered.map(p => {
                  const inList = items.some(x=>x.productId===p.id);
                  return <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid var(--bd)"}}>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:500,wordBreak:"break-word"}}>{p.name}</div>
                      {p.desc&&<div style={{fontSize:8,color:"var(--t3)"}}>{p.desc.substring(0,60)}</div>}</div>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <span className="nm" style={{fontSize:10,color:"var(--t2)"}}>{p.price>0?fmt(p.price):"Incl."}</span>
                      <button className={"btn bs "+(inList?"bo":"bp")} onClick={()=>addExtra(p)} style={{fontSize:9}}>
                        {inList?<><I name="check" size={9}/> Added</>:<><I name="plus" size={9}/> Add</>}</button>
                    </div>
                  </div>;
                })}
                {filtered.length===0&&<div style={{fontSize:10,color:"var(--t3)",padding:8,textAlign:"center"}}>No products match</div>}
              </div>
            </div>;
          })()}
        </div>;
      })() : (
        <div>
          <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:6}}>
            <button className="btn bs" onClick={()=>setOpenCat(null)}><I name="arrowL" size={10}/> Back</button>
            <span style={{fontSize:11,fontWeight:600}}>{cats.find(c=>c.key===openCat)?.label}</span>
          </div>
          <input className="inp is" placeholder="Search extras..." value={extSearch} onChange={e=>setExtSearch(e.target.value)} style={{marginBottom:4}}/>
          <div style={{maxHeight:200,overflowY:"auto"}}>
            {(()=>{
              const cat = cats.find(c=>c.key===openCat);
              if(!cat) return null;
              const prods = getExtrasForCat(cat).filter(p => !extSearch || p.name.toLowerCase().includes(extSearch.toLowerCase()));
              return prods.map(p => {
                const inList = items.some(x=>x.productId===p.id);
                return <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid var(--bd)"}}>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <span className="nm" style={{fontSize:10,color:"var(--t2)"}}>{fmt(p.price)}</span>
                    <button className={"btn bs "+(inList?"bo":"bp")} onClick={()=>addExtra(p)} style={{fontSize:9}}>
                      {inList?<><I name="check" size={9}/> Added</>:<><I name="plus" size={9}/> Add</>}</button>
                  </div>
                </div>;
              });
            })()}
          </div>
        </div>
      )}
    </div>);
  };

  /* ── WIZARD ── */
  const renderWiz = () => {
    if(!cur.b) return null;
    const b=cur.b, bt=b.type, isCfg=wizStep===-1;
    const isBath=bt.includes("Bathroom"), isWet=bt.includes("Wet"), isKit=bt.includes("Kitchen"), isRoof=bt.includes("Roofing"), isHalf=bt==="Half Bath";

    if(isCfg){
      const ok = isHalf ? true : isKit ? !!wizConfig.sinkBase : isRoof ? true : (!!wizConfig.brand && !!wizConfig.size && (isWet || !!wizConfig.vanityType));
      return (<>
        <div className="tb"><div style={{display:"flex",alignItems:"center",gap:7}}>
          <button className="bg2" onClick={()=>{setView("projects");setABuild(null)}}><I name="arrowL" size={15}/></button>
          <div><div className="tb-t">{b.name} — Configure</div><div style={{fontSize:9,color:"var(--t2)"}}>{cur.c ? cur.c.name : ""}</div></div></div>
          <span className="tg tbl">{bt}</span></div>
        <div className="ct" style={{maxWidth:620}}>
          <div className="cd" style={{background:"linear-gradient(135deg,rgba(59,109,240,.06),rgba(45,212,160,.04))",border:"1px solid rgba(59,109,240,.15)"}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{isHalf?"Half Bath Build":"Configure Your Build"}</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>{isHalf?"No additional configuration needed for half bath — click Start to begin product selection.":"Set parameters to determine which products appear in each step."}</div></div>
          {(isBath||isWet) && (<>
            <div className="ig"><label>Brand</label></div>
            <div className="cg">{BRANDS.map(br => <div key={br} className={"co"+(wizConfig.brand===br?" sel":"")} onClick={()=>setWizConfig({...wizConfig,brand:br})}>{br}</div>)}</div>
            {isBath && (<><div className="ig"><label>Vanity Type</label></div>
              <div className="cg">{VAN_TYPES.map(vt => <div key={vt} className={"co"+(wizConfig.vanityType===vt?" sel":"")} onClick={()=>setWizConfig({...wizConfig,vanityType:vt})}>{vt} Vanity</div>)}</div></>)}
            <div className="ig"><label>Bathroom Size</label></div>
            <div className="cg">{BATH_SIZES.map(sz => <div key={sz} className={"co"+(wizConfig.size===sz?" sel":"")} onClick={()=>setWizConfig({...wizConfig,size:sz})}>{sz}</div>)}</div>
          </>)}
          {isKit && (<><div className="ig"><label>Sink Base Size</label></div>
            <div className="cg">{KIT_SIZES.map(sz => <div key={sz} className={"co"+(wizConfig.sinkBase===sz?" sel":"")} onClick={()=>setWizConfig({...wizConfig,sinkBase:sz})}>{sz}</div>)}</div></>)}
          {isRoof && (<><div className="cd" style={{background:"linear-gradient(135deg,rgba(45,212,160,.06),rgba(59,109,240,.04))",border:"1px solid rgba(45,212,160,.15)",marginTop:8}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>New Roof Build</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>No additional configuration needed — click Start to begin selecting roof package, upgrades, and extras.</div></div></>)}
          {ok && <div className="cd" style={{background:"var(--ci)",marginTop:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:10,color:"var(--t2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Base Package Price</div>
                <div style={{fontSize:10,color:"var(--t3)",marginTop:2}}>{bt} {wizConfig.brand||""} {wizConfig.size||wizConfig.sinkBase||""} {wizConfig.vanityType?wizConfig.vanityType+" Vanity":""}</div></div>
              <div style={{fontSize:22,fontWeight:700,color:"var(--gd)"}} className="nm">{fmt(getBasePrice(bt,wizConfig,basePriceOverrides))}</div>
            </div>
            <div style={{fontSize:9,color:"var(--t3)",marginTop:6}}>This is the starting price for the build. Product selections from the wizard will add to this base.</div></div>}
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:16}}>
            <button className="btn bp" onClick={()=>{if(ok){setWizStep(0);updB(bl=>({...bl,wizConfig}))}}} disabled={!ok} style={{opacity:ok?1:.4,padding:"8px 20px",fontSize:13}}>
              Start Product Selection <I name="chevR" size={14}/></button></div>
        </div></>);
    }

    const steps=getSteps(bt,wizConfig), cs=steps[wizStep];
    if(!cs) return null;
    const prods=getProds(cs,wizConfig), sel=wizSel[cs.key];
    const isDbl=cs.doubleQty&&wizConfig.vanityType==="Double", dq=isDbl?2:1;
    const hasNone=stepHasNoneOption(cs,prods);
    const filled=steps.filter(s=>wizSel[s.key]).length;
    const allDone=steps.every(s=>wizSel[s.key]);
    const bp=getBasePrice(bt,wizConfig,basePriceOverrides);
    const extrasTotal = (cur.b.extras||[]).reduce((s,x)=>s+(x.price||0)*(x.qty||1)+(x.customAmt||0),0);
    const runTot=bp+extrasTotal+steps.reduce((sum,s)=>{const sl=wizSel[s.key];if(!sl||sl.pid==="NONE")return sum;return sum+(sl.price*(sl.qty||1))+(sl.customAmt||0)},0);

    // Flooring: LVP/LVT type products excluded from Full Bathroom (included in base)
    const isFullBathFloor = bt==="Full Bathroom Remodel" && cs.key==="bath_flooring";
    let dispProds = prods;
    if(isFullBathFloor) dispProds = prods.filter(p => !p.name.startsWith("LVP OR LVT FLOORING - LVP") && !p.name.startsWith("LVP OR LVT FLOORING - LVT"));

    // Cascading filters
    const fData = getStepFilters(dispProds, cs.key);
    const hasFilters = !!(fData.f1 && fData.f1.opts.length > 1);
    const filteredProds = hasFilters ? fData.filtered : dispProds;

    const selProd = p => {
      const prev = wizSel[cs.key];
      const keep = prev && prev.pid===p.id;
      setWizSel({...wizSel,[cs.key]:{pid:p.id,pn:p.name,price:p.price,qty:keep?prev.qty:dq,customAmt:keep?(prev.customAmt||0):0,note:keep?(prev.note||""):""}});
    };
    const selNone = () => setWizSel({...wizSel,[cs.key]:{pid:"NONE",pn:"None",price:0,qty:0,customAmt:0,note:""}});
    const selCustSupplied = () => setWizSel({...wizSel,[cs.key]:{pid:"CUST_SUPPLIED",pn:"Customer Supplied — "+cs.label,price:0,qty:1,customAmt:0,note:sel&&sel.pid==="CUST_SUPPLIED"?(sel.note||""):""}});
    const updSel = (field,val) => { if(!sel) return; setWizSel({...wizSel,[cs.key]:{...sel,[field]:val}}); };

    return (<>
      <div className="tb"><div style={{display:"flex",alignItems:"center",gap:7}}>
        <button className="bg2" onClick={()=>{setView("projects");setABuild(null)}}><I name="arrowL" size={15}/></button>
        <div><div className="tb-t">{b.name}</div><div style={{fontSize:9,color:"var(--t2)"}}>{wizConfig.brand||wizConfig.sinkBase||""} {wizConfig.vanityType?("\u00b7 "+wizConfig.vanityType):""} {wizConfig.size?("\u00b7 "+wizConfig.size):""}</div></div></div>
        <div className="tb-a"><div style={{fontSize:11,fontWeight:600,color:"var(--a2)",marginRight:8}} className="nm">Running: {fmt(runTot)}</div><span className="tg tbl">{bt}</span></div></div>
      <div className="ct">
        <div className="wiz-steps">{steps.map((s,i)=>{
          const d=!!wizSel[s.key],isN=d&&wizSel[s.key].pid==="NONE",ic=i===wizStep;
          return <div key={s.key+i} className={"ws"+(ic?" cur":"")+(d&&!ic?(isN?" skip":" done"):"")+(!d&&!ic?" blk":"")} onClick={()=>{if(d||i<=filled)setWizStep(i)}}>
            {d&&!isN&&<I name="check" size={10}/>}{isN&&<I name="skip" size={10}/>}{s.label}</div>;
        })}</div>
        <div className="sr">
          <div className="ss"><div className="ssl">Base Package</div><div className="ssv nm" style={{color:"var(--gd)"}}>{fmt(bp)}</div></div>
          <div className="ss"><div className="ssl">Step</div><div className="ssv">{wizStep+1} / {steps.length}</div></div>
          <div className="ss"><div className="ssl">Done</div><div className="ssv" style={{color:"var(--ok)"}}>{filled}</div></div>
          <div className="ss"><div className="ssl">Running Total</div><div className="ssv nm" style={{color:"var(--a2)"}}>{fmt(runTot)}</div></div>
          {isDbl&&<div className="ss"><div className="ssl">Qty</div><div className="ssv" style={{color:"var(--wn)"}}>x2 Double</div></div>}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,paddingBottom:8,borderBottom:"1px solid var(--bd)"}}>
          <div><div style={{fontSize:10,color:"var(--t2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Step {wizStep+1} of {steps.length}</div>
            <div style={{fontSize:16,fontWeight:700}}>{cs.label}</div>
            {isDbl&&<div style={{fontSize:10,color:"var(--wn)",fontWeight:600,marginTop:2}}>Double Vanity — qty defaults to 2</div>}
            {isFullBathFloor&&<div style={{fontSize:10,color:"var(--ok)",fontWeight:600,marginTop:2}}>LVP/LVT flooring included in base package</div>}</div>
          <div style={{fontSize:9,fontWeight:700,color:"var(--er)",textTransform:"uppercase",letterSpacing:".08em"}}>Required</div></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,padding:"8px 0",borderBottom:"1px solid var(--bd)"}}>
          <button className="btn" onClick={()=>{setSearch("");wizStep>0?setWizStep(wizStep-1):setWizStep(-1)}}><I name="arrowL" size={12}/> {wizStep===0?"Config":"Prev"}</button>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {!sel&&<div style={{fontSize:10,color:"var(--er)",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><I name="alertTri" size={12}/> Select to continue</div>}
            {wizStep<steps.length-1&&<button className="btn bp" onClick={()=>{if(sel){setSearch("");setWizStep(wizStep+1)}}} disabled={!sel} style={{opacity:sel?1:.4}}>Next <I name="chevR" size={12}/></button>}
            {wizStep===steps.length-1&&<button className="btn bo" onClick={finalizeWiz} disabled={!allDone} style={{opacity:allDone?1:.4,padding:"7px 18px",fontSize:12}}>
              <I name="checkCircle" size={14}/> Finalize ({filled}/{steps.length})</button>}</div></div>
        <input className="inp is" placeholder={"Search "+cs.label+"..."} value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:8}}/>
        {hasFilters&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          {fData.f1&&fData.f1.opts.length>1&&<div style={{flex:"1 1 140px",minWidth:120}}>
            <label style={{fontSize:9,fontWeight:600,color:"var(--t2)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:2,display:"block"}}>{fData.f1.label}</label>
            <select className="inp is" value={fData.f1.val} onChange={e=>setStepFilter(cs.key,"f1",e.target.value)} style={{fontSize:11,padding:"5px 6px"}}>
              <option value="">All {fData.f1.label}s ({fData.f1.opts.length})</option>
              {fData.f1.opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
          {fData.f2&&fData.f2.opts.length>1&&<div style={{flex:"1 1 140px",minWidth:120}}>
            <label style={{fontSize:9,fontWeight:600,color:"var(--t2)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:2,display:"block"}}>{fData.f2.label}</label>
            <select className="inp is" value={fData.f2.val} onChange={e=>setStepFilter(cs.key,"f2",e.target.value)} style={{fontSize:11,padding:"5px 6px"}}>
              <option value="">All {fData.f2.label}s ({fData.f2.opts.length})</option>
              {fData.f2.opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
          {fData.f3&&fData.f3.opts.length>1&&<div style={{flex:"1 1 140px",minWidth:120}}>
            <label style={{fontSize:9,fontWeight:600,color:"var(--t2)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:2,display:"block"}}>{fData.f3.label}</label>
            <select className="inp is" value={fData.f3.val} onChange={e=>setStepFilter(cs.key,"f3",e.target.value)} style={{fontSize:11,padding:"5px 6px"}}>
              <option value="">All {fData.f3.label}s ({fData.f3.opts.length})</option>
              {fData.f3.opts.map(o=><option key={o} value={o}>{o}</option>)}</select></div>}
          {(fData.f1?.val||fData.f2?.val||fData.f3?.val)&&<button className="btn bs" onClick={()=>setWizFilters({...wizFilters,[cs.key]:{}})} style={{alignSelf:"flex-end",fontSize:10,padding:"5px 8px"}}>Clear Filters</button>}
        </div>}
        {hasFilters&&<div style={{fontSize:10,color:"var(--t2)",marginBottom:6}}>{filteredProds.filter(p=>{const u=p.name.toUpperCase();return !(u.includes("- NONE")||u.endsWith("NONE")||u.includes(", NONE")||u.includes("- NA,")||u.endsWith(", NA")||u.endsWith("- NA"));}).length} product{filteredProds.length!==1?"s":""} showing</div>}
        {hasNone&&<div className={"pc nc"+(sel&&sel.pid==="NONE"?" sel":"")} onClick={selNone}>
          <div><div className="pn" style={{color:"var(--wn)"}}>None — Skip this product</div><div className="pa">Select if not needed for this build</div></div>
          {sel&&sel.pid==="NONE"&&<I name="check" size={16}/>}</div>}
        {hasNone&&<div className={"pc"+(sel&&sel.pid==="CUST_SUPPLIED"?" sel":"")} style={{borderLeft:"3px solid var(--a2)"}} onClick={selCustSupplied}>
          <div><div className="pn" style={{color:"var(--a2)"}}>Customer Supplied</div><div className="pa">Customer is providing this product — included on work order at $0</div></div>
          {sel&&sel.pid==="CUST_SUPPLIED"&&<I name="check" size={16}/>}</div>}
        {sel&&sel.pid==="CUST_SUPPLIED"&&<div className="cd" style={{marginTop:4,marginBottom:4,border:"1px solid var(--ac)",background:"rgba(59,109,240,.04)"}}>
          <div style={{fontSize:11,fontWeight:600,marginBottom:6,color:"var(--a2)"}}>Customer Supplied — {cs.label}</div>
          <div className="ig" style={{marginBottom:0}}><label>Work Note (optional)</label>
            <input className="inp is" placeholder="Notes about customer-supplied item..." value={sel.note||""} onChange={e=>updSel("note",e.target.value)}/></div></div>}
        <div style={{maxHeight:sel&&sel.pid&&sel.pid!=="NONE"&&sel.pid!=="CUST_SUPPLIED"?260:sel&&sel.pid==="CUST_SUPPLIED"?240:380,overflowY:"auto"}}>{filteredProds.filter(p=>{
          const u=p.name.toUpperCase();if(u.includes("- NONE")||u.endsWith("NONE")||u.includes(", NONE")||u.includes("- NA,")||u.endsWith(", NA")||u.endsWith("- NA"))return false;
          return !search||p.name.toLowerCase().includes(search.toLowerCase());
        }).map(p=><div key={p.id} className={"pc"+(sel&&sel.pid===p.id?" sel":"")} onClick={()=>selProd(p)}>
          <div style={{flex:1,minWidth:0}}><div className="pn">{p.name}</div>{p.desc&&<div className="pa">{p.desc}</div>}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {p.price>0&&<div className="pp">{fmt(p.price)}</div>}
            {p.price===0&&<div className="pp" style={{color:"var(--t3)"}}>Included</div>}
            {sel&&sel.pid===p.id&&<I name="check" size={16}/>}</div></div>)}
          {filteredProds.length===0&&<div className="em"><I name="package" size={32}/><p>No products match these filters.</p></div>}</div>
        {sel&&sel.pid&&sel.pid!=="NONE"&&sel.pid!=="CUST_SUPPLIED"&&<div className="cd" style={{marginTop:8,border:"1px solid var(--ok)",background:"rgba(45,212,160,.04)"}}>
          <div style={{fontSize:11,fontWeight:600,marginBottom:6,color:"var(--ok)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sel.pn}</div>
          <div style={{display:"grid",gridTemplateColumns:"100px 120px 1fr",gap:8,alignItems:"end"}}>
            <div className="ig" style={{marginBottom:0}}><label>Qty</label>
              <div style={{display:"flex",alignItems:"center",gap:3}}>
                <button className="btn bs" onClick={()=>updSel("qty",Math.max(1,(sel.qty||1)-1))} style={{padding:"3px 7px",lineHeight:1}}>-</button>
                <DInput className="inp is" type="number" min="1" value={sel.qty||1} onChange={v=>updSel("qty",Math.max(1,v||1))} style={{width:40,textAlign:"center"}}/>
                <button className="btn bs" onClick={()=>updSel("qty",(sel.qty||1)+1)} style={{padding:"3px 7px",lineHeight:1}}>+</button>
              </div></div>
            <div className="ig" style={{marginBottom:0}}><label>Custom Add-On $</label>
              <DInput className="inp is" type="number" step="0.01" placeholder="0.00" value={sel.customAmt||""} onChange={v=>updSel("customAmt",v)}/></div>
            <div className="ig" style={{marginBottom:0}}><label>Line Total</label>
              <div style={{padding:"4px 0",fontSize:14,fontWeight:700,color:"var(--a2)"}} className="nm">{fmt((sel.price*(sel.qty||1))+(sel.customAmt||0))}</div></div></div>
          <div className="ig" style={{marginTop:8,marginBottom:0}}><label>Work Note (optional)</label>
            <input className="inp is" placeholder="Custom instructions, measurements, special notes..." value={sel.note||""} onChange={e=>updSel("note",e.target.value)}/></div></div>}

      </div></>);
  };

  /* ── PRICEBOOK ── */
  // Get filter labels for a subcategory from existing products
  const getSubFilterLabels = (subLabel) => {
    const prods = allProducts.filter(p => p.sub === subLabel);
    return {
      f1l: prods.find(p => p.f1l)?.f1l || "",
      f2l: prods.find(p => p.f2l)?.f2l || "",
      f3l: prods.find(p => p.f3l)?.f3l || "",
    };
  };

  const addPbItem = () => {
    if (!newItem.name || !pbCat || !pbSub) return;
    const subDef = PB_CATS[pbCat]?.find(s=>s.key===pbSub);
    if (!subDef) return;
    const prefix = subDef.pfx[0] || subDef.label;
    const fl = getSubFilterLabels(subDef.label);
    const product = {
      id: "custom_" + gid(),
      name: prefix + " - " + newItem.name,
      price: parseFloat(newItem.price) || 0,
      cost: parseFloat(newItem.cost) || 0,
      itemType: newItem.itemType || "Material",
      cat: pbCat,
      sub: subDef.label,
      desc: "",
      sup: newItem.supplier || "",
      sku: newItem.sku || "",
      supplier: newItem.supplier || "",
      f1l: fl.f1l, f1v: newItem.f1v || "",
      f2l: fl.f2l, f2v: newItem.f2v || "",
      f3l: fl.f3l, f3v: newItem.f3v || "",
      custom: true,
    };
    saveCP([...customProducts, product]);
    setNewItem({name:"",price:"",cost:"",sku:"",supplier:"",itemType:"Product",f1v:"",f2v:"",f3v:""});
    setShowAddItem(false);
    flash("Item added to " + subDef.label);
  };

  const deletePbItem = (prodId) => {
    saveCP(customProducts.filter(p => p.id !== prodId));
    flash("Item removed");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditData({name: p.name, price: p.price, cost: p.cost||0, sku: p.sku||"", supplier: p.supplier||p.sup||"", desc: p.desc||"", itemType: p.itemType||"Product", f1v: p.f1v||"", f2v: p.f2v||"", f3v: p.f3v||""});
  };

  const saveEdit = () => {
    if (!editingId) return;
    const updates = {
      name: editData.name,
      price: parseFloat(editData.price)||0,
      cost: parseFloat(editData.cost)||0,
      sku: editData.sku||"",
      supplier: editData.supplier||"",
      sup: editData.supplier||"",
      desc: editData.desc||"",
      itemType: editData.itemType||"Product",
      f1v: editData.f1v||"",
      f2v: editData.f2v||"",
      f3v: editData.f3v||"",
    };
    // Check if it's a custom product or a pre-loaded one
    const isCustom = customProducts.some(p => p.id === editingId);
    const origProduct = allProducts.find(p => p.id === editingId);
    if (isCustom) {
      saveCP(customProducts.map(p => p.id === editingId ? {...p, ...updates} : p));
      logPriceChange("product_edit", {product: updates.name, productId: editingId, oldPrice: origProduct?.price, newPrice: updates.price, oldCost: origProduct?.cost, newCost: updates.cost, custom: true});
    } else {
      saveOV({...productOverrides, [editingId]: updates});
      logPriceChange("product_edit", {product: updates.name, productId: editingId, oldPrice: origProduct?.price, newPrice: updates.price, oldCost: origProduct?.cost, newCost: updates.cost});
    }
    setEditingId(null);
    setEditData({});
    flash("Item updated");
  };

  const cancelEdit = () => { setEditingId(null); setEditData({}); };

  const renderPB = () => {
    const catKeys = Object.keys(PB_CATS);
    // Get products for current subcategory
    const subDef = pbCat && pbSub ? PB_CATS[pbCat]?.find(s=>s.key===pbSub) : null;
    const subProds = subDef ? allProducts.filter(p => {
      const pfxMatch = subDef.pfx.some(px => p.name.startsWith(px));
      if (!pfxMatch) return false;
      // For Extras categories, also filter by product category to prevent cross-contamination
      if (pbCat === "Bathroom Extras" && p.cat && p.cat !== "Bathroom Extras" && p.cat !== "General") return false;
      if (pbCat === "Kitchen Extras" && p.cat && p.cat !== "Kitchen Extras" && p.cat !== "General") return false;
      return true;
    }).filter(p => !pbSearch || p.name.toLowerCase().includes(pbSearch.toLowerCase())) : [];
    // Global search across all products
    const globalSearch = pbSearch && !pbCat ? allProducts.filter(p => p.name.toLowerCase().includes(pbSearch.toLowerCase())).slice(0,150) : [];

    return (<>
      <div className="tb">
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          {(pbCat||pbSub) && <button className="bg2" onClick={()=>{if(pbSub){setPbSub(null);setShowAddItem(false)}else{setPbCat(null)}setPbSearch("")}}><I name="arrowL" size={15}/></button>}
          <div className="tb-t">{!pbCat ? "Pricebook" : !pbSub ? pbCat : (PB_CATS[pbCat]?.find(s=>s.key===pbSub)?.label||pbSub)}</div>
          {pbCat && !pbSub && <span className="tg tbl" style={{marginLeft:6}}>{(PB_CATS[pbCat]||[]).length} subcategories</span>}
          {subDef && <span className="tg tbl" style={{marginLeft:6}}>{subProds.length} items</span>}
        </div>
        <div className="tb-a">
          <input className="inp is" placeholder="Search..." value={pbSearch} onChange={e=>setPbSearch(e.target.value)} style={{width:170}}/>
          <span style={{fontSize:10,color:"var(--t2)"}}>{allProducts.length} total</span>
        </div>
      </div>
      <div className="ct">
        {/* Global search results */}
        {pbSearch && !pbCat && globalSearch.length > 0 && <>
          <div style={{fontSize:10,color:"var(--t2)",marginBottom:6}}>{globalSearch.length} results for "{pbSearch}"</div>
          <table><thead><tr><th>Item</th><th>Category</th><th style={{textAlign:"right"}}>Price</th></tr></thead><tbody>
            {globalSearch.map(p=>{const c=getProductCategory(p);return <tr key={p.id}>
              <td style={{fontWeight:500}}><div style={{maxWidth:320,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                {p.sku&&<div style={{fontSize:9,color:"var(--t3)"}}>SKU: {p.sku}</div>}</td>
              <td><span className="tg tbl" style={{fontSize:8}}>{c.cat}</span> <span style={{fontSize:9,color:"var(--t2)"}}>{c.sub}</span></td>
              <td className="nm" style={{textAlign:"right",fontWeight:600}}>{p.price?fmt(p.price):"Included"}</td></tr>})}
          </tbody></table>
        </>}

        {/* No search - show category navigation */}
        {!pbSearch && !pbCat && <div>
          <div style={{fontSize:10,color:"var(--t2)",marginBottom:10}}>Select a category to browse products</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {catKeys.map(cat => {
              const subs = PB_CATS[cat];
              const count = subs.reduce((s,sub) => s + allProducts.filter(p => {
                const pfxMatch = sub.pfx.some(px => p.name.startsWith(px));
                if (!pfxMatch) return false;
                if (cat === "Bathroom Extras" && p.cat && p.cat !== "Bathroom Extras" && p.cat !== "General") return false;
                if (cat === "Kitchen Extras" && p.cat && p.cat !== "Kitchen Extras" && p.cat !== "General") return false;
                return true;
              }).length, 0);
              const colors = {"Bathroom":"var(--ac)","Kitchen":"var(--ok)","Roofing":"var(--wn)","Bathroom Extras":"var(--er)","Kitchen Extras":"var(--gd)","Roofing Extras":"var(--wn)"};
              return <div key={cat} className="cd" style={{cursor:"pointer",borderLeft:"3px solid "+(colors[cat]||"var(--bd)")}} onClick={()=>{setPbCat(cat);setPbSearch("")}}>
                <div style={{fontSize:15,fontWeight:700}}>{cat}</div>
                <div style={{fontSize:11,color:"var(--t2)",marginTop:2}}>{subs.length} subcategories</div>
                <div style={{fontSize:11,color:"var(--t3)",marginTop:1}}>{count} products</div>
              </div>;
            })}
          </div>
        </div>}

        {/* Subcategory list */}
        {pbCat && !pbSub && !pbSearch && <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
            {(PB_CATS[pbCat]||[]).map(sub => {
              const count = allProducts.filter(p => {
                const pfxMatch = sub.pfx.some(px => p.name.startsWith(px));
                if (!pfxMatch) return false;
                if (pbCat === "Bathroom Extras" && p.cat && p.cat !== "Bathroom Extras" && p.cat !== "General") return false;
                if (pbCat === "Kitchen Extras" && p.cat && p.cat !== "Kitchen Extras" && p.cat !== "General") return false;
                return true;
              }).length;
              return <div key={sub.key} className="co" style={{textAlign:"left",padding:"12px",fontSize:12}} onClick={()=>{setPbSub(sub.key);setPbSearch("");setShowAddItem(false)}}>
                <div style={{fontWeight:600}}>{sub.label}</div>
                <div style={{fontSize:10,color:"var(--t2)",marginTop:2}}>{count} items</div>
              </div>;
            })}
          </div>
        </div>}

        {/* Product list within subcategory */}
        {subDef && <>
          {/* Add item button + form */}
          {!showAddItem ? (
            <button className="btn bp" style={{marginBottom:10}} onClick={()=>setShowAddItem(true)}><I name="plus" size={12}/> Add New Item</button>
          ) : (
            <div className="cd" style={{border:"1px solid var(--ac)",background:"rgba(59,109,240,.04)",marginBottom:10}}>
              <div className="cd-t" style={{color:"var(--a2)",marginBottom:8}}>Add Item to {subDef.label}</div>
              <div className="g2">
                <div className="ig"><label>Item Name *</label>
                  <input className="inp is" placeholder="Product name" value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})}/></div>
                <div className="ig"><label>Price *</label>
                  <input className="inp is" type="number" step="0.01" placeholder="0.00" value={newItem.price} onChange={e=>setNewItem({...newItem,price:e.target.value})}/></div>
                <div className="ig"><label>Cost (internal)</label>
                  <input className="inp is" type="number" step="0.01" placeholder="0.00" value={newItem.cost} onChange={e=>setNewItem({...newItem,cost:e.target.value})}/></div>
                <div className="ig"><label>SKU</label>
                  <input className="inp is" placeholder="Optional SKU" value={newItem.sku} onChange={e=>setNewItem({...newItem,sku:e.target.value})}/></div>
                <div className="ig"><label>Supplier</label>
                  <select className="inp is" value={newItem.supplier} onChange={e=>setNewItem({...newItem,supplier:e.target.value})}>
                    <option value="">Select supplier...</option>
                    {SUPPLIER_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                  </select></div>
                <div className="ig"><label>Item Type</label>
                  <select className="inp is" value={newItem.itemType||"Product"} onChange={e=>setNewItem({...newItem,itemType:e.target.value})}>
                    <option value="Material">Material</option><option value="Product">Product</option>
                  </select></div>
              </div>
              {(()=>{const fl=getSubFilterLabels(subDef.label); return (fl.f1l||fl.f2l||fl.f3l) ? (
                <div style={{marginTop:6,padding:"8px 0",borderTop:"1px solid var(--bd)"}}>
                  <div style={{fontSize:10,fontWeight:600,color:"var(--t2)",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Filter Values</div>
                  <div className="g2">
                    {fl.f1l&&<div className="ig"><label>{fl.f1l}</label>
                      <input className="inp is" placeholder={fl.f1l+" value"} value={newItem.f1v} onChange={e=>setNewItem({...newItem,f1v:e.target.value})}/></div>}
                    {fl.f2l&&<div className="ig"><label>{fl.f2l}</label>
                      <input className="inp is" placeholder={fl.f2l+" value"} value={newItem.f2v} onChange={e=>setNewItem({...newItem,f2v:e.target.value})}/></div>}
                    {fl.f3l&&<div className="ig"><label>{fl.f3l}</label>
                      <input className="inp is" placeholder={fl.f3l+" value"} value={newItem.f3v} onChange={e=>setNewItem({...newItem,f3v:e.target.value})}/></div>}
                  </div>
                </div>
              ) : null;})()}
              <div style={{display:"flex",gap:4,justifyContent:"flex-end",marginTop:4}}>
                <button className="btn bs" onClick={()=>{setShowAddItem(false);setNewItem({name:"",price:"",cost:"",sku:"",supplier:"",itemType:"Product",f1v:"",f2v:"",f3v:""})}}>Cancel</button>
                <button className="btn bs bp" onClick={addPbItem} disabled={!newItem.name}>Add Item</button>
              </div>
            </div>
          )}

          <table><thead><tr>
            <th>Item</th>
            <th style={{width:50}}>Type</th>
            <th style={{width:70}}>SKU</th>
            <th style={{width:80}}>Supplier</th>
            <th style={{textAlign:"right",width:70}}>Cost</th>
            <th style={{textAlign:"right",width:80}}>Price</th>
            <th style={{width:60}}></th>
          </tr></thead><tbody>
            {subProds.map(p=>{
              const isEd = editingId === p.id;
              const isModified = !p.custom && productOverrides[p.id];
              if (isEd) return <tr key={p.id} style={{background:"rgba(59,109,240,.06)"}}>
                <td colSpan={7} style={{padding:10}}>
                  <div style={{fontSize:10,fontWeight:600,color:"var(--a2)",marginBottom:6}}>Editing Item</div>
                  <div className="g2">
                    <div className="ig"><label>Name</label><input className="inp is" value={editData.name||""} onChange={e=>setEditData({...editData,name:e.target.value})}/></div>
                    <div className="ig"><label>Price</label><input className="inp is" type="number" step="0.01" value={editData.price||""} onChange={e=>setEditData({...editData,price:e.target.value})}/></div>
                    <div className="ig"><label>Cost (internal)</label><input className="inp is" type="number" step="0.01" value={editData.cost||""} onChange={e=>setEditData({...editData,cost:e.target.value})}/></div>
                    <div className="ig"><label>SKU</label><input className="inp is" value={editData.sku||""} onChange={e=>setEditData({...editData,sku:e.target.value})}/></div>
                    <div className="ig"><label>Supplier</label><select className="inp is" value={editData.supplier||""} onChange={e=>setEditData({...editData,supplier:e.target.value})}>
                      <option value="">Select supplier...</option>
                      {SUPPLIER_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                    </select></div>
                    <div className="ig"><label>Item Type</label><select className="inp is" value={editData.itemType||"Product"} onChange={e=>setEditData({...editData,itemType:e.target.value})}>
                      <option value="Material">Material</option><option value="Product">Product</option>
                    </select></div>
                  </div>
                  <div className="ig"><label>Description</label><input className="inp is" value={editData.desc||""} onChange={e=>setEditData({...editData,desc:e.target.value})}/></div>
                  {(()=>{const fl={f1l:p.f1l||"",f2l:p.f2l||"",f3l:p.f3l||""}; if(!fl.f1l&&!fl.f2l&&!fl.f3l){const sfl=getSubFilterLabels(p.sub||"");fl.f1l=sfl.f1l;fl.f2l=sfl.f2l;fl.f3l=sfl.f3l;} return (fl.f1l||fl.f2l||fl.f3l) ? (
                    <div style={{marginTop:4,padding:"6px 0",borderTop:"1px solid var(--bd)"}}>
                      <div style={{fontSize:9,fontWeight:600,color:"var(--t2)",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Filter Values</div>
                      <div className="g2">
                        {fl.f1l&&<div className="ig"><label>{fl.f1l}</label><input className="inp is" value={editData.f1v||""} onChange={e=>setEditData({...editData,f1v:e.target.value})}/></div>}
                        {fl.f2l&&<div className="ig"><label>{fl.f2l}</label><input className="inp is" value={editData.f2v||""} onChange={e=>setEditData({...editData,f2v:e.target.value})}/></div>}
                        {fl.f3l&&<div className="ig"><label>{fl.f3l}</label><input className="inp is" value={editData.f3v||""} onChange={e=>setEditData({...editData,f3v:e.target.value})}/></div>}
                      </div>
                    </div>
                  ) : null;})()}
                  <div style={{display:"flex",gap:4,justifyContent:"flex-end",marginTop:4}}>
                    <button className="btn bs" onClick={cancelEdit}>Cancel</button>
                    <button className="btn bs bp" onClick={saveEdit}>Save</button>
                  </div>
                </td></tr>;
              return <tr key={p.id}>
                <td style={{fontWeight:500}}>
                  <div style={{maxWidth:300,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                  {p.desc&&<div style={{fontSize:9,color:"var(--t3)"}}>{p.desc}</div>}
                  {isModified&&<div style={{fontSize:8,color:"var(--wn)",fontWeight:600}}>Modified</div>}
                </td>
                <td style={{fontSize:9,color:p.itemType==="Product"?"var(--a2)":"var(--t3)"}}>{p.itemType||"Mat."}</td>
                <td style={{fontSize:10,color:"var(--t2)"}}>{p.sku||""}</td>
                <td style={{fontSize:10,color:"var(--t2)"}}>{mapSupplier(p.supplier||p.sup||"")}</td>
                <td className="nm" style={{textAlign:"right",fontSize:10,color:"var(--t3)"}}>{p.cost?fmt(p.cost):""}</td>
                <td className="nm" style={{textAlign:"right",fontWeight:600}}>{p.price?fmt(p.price):"Incl."}</td>
                <td style={{whiteSpace:"nowrap"}}>
                  <button className="bg2" style={{color:"var(--a2)"}} onClick={()=>startEdit(p)} title="Edit"><I name="file" size={11}/></button>
                  {p.custom&&<button className="bg2" style={{color:"var(--er)"}} onClick={()=>deletePbItem(p.id)} title="Delete"><I name="trash" size={11}/></button>}
                </td>
              </tr>;
            })}
            {subProds.length===0&&<tr><td colSpan={7} style={{textAlign:"center",padding:20,color:"var(--t3)"}}>No products in this subcategory yet. Click "Add New Item" above.</td></tr>}
          </tbody></table>
        </>}

        {/* Empty search state */}
        {pbSearch && !pbCat && globalSearch.length===0 && <div className="em"><I name="search" size={32}/><p>No products match "{pbSearch}"</p></div>}
      </div>
    </>);
  };

  /* ── INTEGRATIONS ── */
  const renderGHL = () => (<>
    <div className="tb"><div className="tb-t"><I name="zap" size={14}/> Integrations</div></div>
    <div className="ct" style={{maxWidth:580}}>
      <div className="cd"><div className="cd-t" style={{marginBottom:10}}>Connection</div>
        <div className="ig"><label>API Key</label><input className="inp" type="password" value={ghl.apiKey} onChange={e=>setGhl({...ghl,apiKey:e.target.value})}/></div>
        <div className="ig"><label>Location ID</label><input className="inp" value={ghl.locationId} onChange={e=>setGhl({...ghl,locationId:e.target.value})}/></div>
        <div className="g2"><div className="ig"><label>Pipeline ID</label><input className="inp" value={ghl.pipelineId} onChange={e=>setGhl({...ghl,pipelineId:e.target.value})}/></div>
          <div className="ig"><label>Stage ID</label><input className="inp" value={ghl.stageId} onChange={e=>setGhl({...ghl,stageId:e.target.value})}/></div></div>
        <div className="ig"><label>Webhook URL</label><input className="inp" value={ghl.webhookUrl} onChange={e=>setGhl({...ghl,webhookUrl:e.target.value})}/></div>
        <label style={{display:"flex",alignItems:"center",gap:6,fontSize:11,marginTop:8,cursor:"pointer"}}><input type="checkbox" checked={ghl.enabled} onChange={e=>setGhl({...ghl,enabled:e.target.checked})}/>Enable</label>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button className="btn bp" onClick={()=>{saveG(ghl);flash("Saved!")}}>Save</button></div></div></div></>);

  /* ── ADMIN ── */
  const renderAdmin = () => {
    const allBPKeys = Object.keys(BASE_PRICES);
    const parseKey = k => {
      if (k === "kitchen") return { type: "Kitchen", size: "", vanity: "", brand: "" };
      if (k === "roofing") return { type: "Roofing", size: "", vanity: "", brand: "" };
      const parts = k.split("|");
      const isWet = parts[1] === "wet";
      return { type: isWet ? "Wet Area Only" : "Full Bathroom", size: parts[0], vanity: isWet ? "" : parts[1], brand: parts[2] || "" };
    };

    // Group base prices by type
    const grouped = {};
    allBPKeys.forEach(k => {
      const info = parseKey(k);
      const g = info.type + (info.vanity ? " — " + info.vanity + " Vanity" : "");
      if (!grouped[g]) grouped[g] = [];
      const currentPrice = basePriceOverrides[k] !== undefined ? basePriceOverrides[k] : BASE_PRICES[k];
      const isModified = basePriceOverrides[k] !== undefined;
      grouped[g].push({ key: k, ...info, price: currentPrice, defaultPrice: BASE_PRICES[k], isModified });
    });

    return (<>
      <div className="tb"><div className="tb-t"><I name="file" size={14}/> Admin</div>
        <button className="btn bs" onClick={()=>refreshPricebook(false)} style={{fontSize:10}}><I name="zap" size={10}/> Sync Pricebook</button></div>
      <div className="ct" style={{maxWidth:720}}>
        <div style={{display:"flex",gap:4,marginBottom:12}}>
          {["base","bulk","csv","log"].map(t => <button key={t} className={"btn"+(adminTab===t?" bp":"")} onClick={()=>setAdminTab(t)} style={{fontSize:11}}>
            {t==="base"?"Base Prices":t==="bulk"?"Bulk Adjust":t==="csv"?"CSV Import":"Price Log"}</button>)}
        </div>

        {adminTab==="base"&&<>
          <div className="cd" style={{background:"linear-gradient(135deg,rgba(212,164,74,.06),rgba(59,109,240,.04))",border:"1px solid rgba(212,164,74,.15)",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>Base Package Prices</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>These are the starting prices for each build type/size/brand combination. Edit any value below — changes are saved instantly and apply to all new builds.</div>
          </div>
          {Object.keys(grouped).sort().map(g => <div key={g} style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--bd)"}}>{g}</div>
            <table><thead><tr>
              <th style={{textAlign:"left"}}>Size</th>
              <th style={{textAlign:"left"}}>Brand</th>
              <th style={{textAlign:"right",width:120}}>Default</th>
              <th style={{textAlign:"right",width:140}}>Current Price</th>
              <th style={{width:50}}></th>
            </tr></thead><tbody>
              {grouped[g].sort((a,b)=>a.size.localeCompare(b.size)||a.brand.localeCompare(b.brand)).map(row => <tr key={row.key} style={row.isModified?{background:"rgba(212,164,74,.06)"}:{}}>
                <td style={{fontSize:11}}>{row.size||"—"}</td>
                <td style={{fontSize:11}}>{row.brand||"—"}</td>
                <td style={{textAlign:"right",fontSize:11,color:"var(--t3)"}} className="nm">{fmt(row.defaultPrice)}</td>
                <td style={{textAlign:"right"}}><input className="inp is" type="number" step="0.01" style={{width:120,textAlign:"right",fontSize:12,fontWeight:600}} value={row.price} onChange={e=>{
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v)) { saveBPO({...basePriceOverrides, [row.key]: v}); logPriceChange("base_price_edit", {key: row.key, size: row.size, brand: row.brand, oldPrice: row.price, newPrice: v}); }
                }}/></td>
                <td>{row.isModified&&<button className="bg2" style={{color:"var(--wn)",fontSize:9}} title="Reset to default" onClick={()=>{
                  const next = {...basePriceOverrides}; delete next[row.key]; saveBPO(next); logPriceChange("base_price_reset", {key: row.key, size: row.size, brand: row.brand, restoredTo: row.defaultPrice});
                }}><I name="x" size={11}/></button>}</td>
              </tr>)}
            </tbody></table>
          </div>)}
          {Object.keys(basePriceOverrides).length > 0 && <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
            <button className="btn bs" style={{color:"var(--er)"}} onClick={()=>{if(confirm("Reset ALL base prices to defaults?")){saveBPO({});logPriceChange("base_price_reset_all",{count:Object.keys(basePriceOverrides).length});flash("All base prices reset to defaults")}}}>Reset All to Defaults</button>
          </div>}
        </>}

        {adminTab==="bulk"&&<>
          <div className="cd" style={{background:"linear-gradient(135deg,rgba(59,109,240,.06),rgba(45,212,160,.04))",border:"1px solid rgba(59,109,240,.15)",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>Bulk Price Adjustment</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>Apply a percentage increase or decrease to all product prices and/or all base package prices at once.</div>
          </div>
          {(()=>{
            const [scope, setScope] = [adminTab==="bulk"?"both":"both", ()=>{}];
            return <div className="cd">
              <div className="cd-t" style={{marginBottom:8}}>Apply Percentage Adjustment</div>
              <div className="g2">
                <div className="ig"><label>Percentage (%)</label>
                  <input id="bulk-pct" className="inp is" type="number" step="0.1" placeholder="e.g. 5 for +5%, -3 for -3%" defaultValue=""/></div>
                <div className="ig"><label>Apply To</label>
                  <select id="bulk-scope" className="inp is" defaultValue="both">
                    <option value="products">Product Prices Only</option>
                    <option value="base">Base Prices Only</option>
                    <option value="both">Both Products & Base Prices</option>
                  </select></div>
              </div>
              <div style={{display:"flex",gap:6,justifyContent:"flex-end",marginTop:8}}>
                <button className="btn bp" onClick={()=>{
                  const pct = parseFloat(document.getElementById("bulk-pct")?.value);
                  const sc = document.getElementById("bulk-scope")?.value || "both";
                  if (!pct || isNaN(pct)) { flash("Enter a valid percentage","er"); return; }
                  const mult = 1 + (pct / 100);
                  const label = (pct > 0 ? "+" : "") + pct + "%";
                  if (!confirm("Apply " + label + " to " + (sc==="products"?"all product prices":sc==="base"?"all base prices":"all product AND base prices") + "?\n\nThis will create overrides for all affected items.")) return;

                  if (sc === "products" || sc === "both") {
                    const newOV = {...productOverrides};
                    allProducts.forEach(p => {
                      if (p.custom) return; // custom products handled separately
                      const cur = newOV[p.id] || {};
                      const origPrice = cur.price !== undefined ? cur.price : p.price;
                      newOV[p.id] = {...cur, price: Math.round(origPrice * mult * 100) / 100};
                    });
                    // Also adjust custom products
                    const newCP = customProducts.map(p => ({...p, price: Math.round(p.price * mult * 100) / 100}));
                    saveOV(newOV);
                    saveCP(newCP);
                  }

                  if (sc === "base" || sc === "both") {
                    const newBP = {...basePriceOverrides};
                    Object.keys(BASE_PRICES).forEach(k => {
                      const cur = newBP[k] !== undefined ? newBP[k] : BASE_PRICES[k];
                      newBP[k] = Math.round(cur * mult * 100) / 100;
                    });
                    saveBPO(newBP);
                  }

                  logPriceChange("bulk_adjust", {percentage: pct, scope: sc, multiplier: mult, productCount: sc!=="base"?allProducts.length:0, basePriceCount: sc!=="products"?Object.keys(BASE_PRICES).length:0});
                  flash("Applied " + label + " adjustment successfully!");
                  document.getElementById("bulk-pct").value = "";
                }}>Apply Adjustment</button>
              </div>
              <div style={{fontSize:10,color:"var(--t3)",marginTop:8}}>Adjustments stack — applying +5% then +3% results in ~+8.15% total. Use the Pricebook or Base Prices tab to reset individual items.</div>
            </div>;
          })()}
        </>}

        {adminTab==="csv"&&<>
          <div className="cd" style={{background:"linear-gradient(135deg,rgba(45,212,160,.06),rgba(59,109,240,.04))",border:"1px solid rgba(45,212,160,.15)",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>CSV Pricebook Import</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>Upload an updated pricebook CSV to replace all embedded product data. The CSV must have columns: SKU, Name, Price, Cost, Supplier, Category, Subcategory, Description, Filter1_Label, Filter1_Value, Filter2_Label, Filter2_Value, Filter3_Label, Filter3_Value</div>
          </div>
          <div className="cd">
            <div className="cd-t" style={{marginBottom:8}}>Import CSV</div>
            <input id="csv-upload" type="file" accept=".csv" style={{marginBottom:8,fontSize:11}} onChange={e=>{
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = evt => {
                try {
                  const text = evt.target.result;
                  const lines = text.split(/\r?\n/).filter(l => l.trim());
                  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g,""));
                  const nameIdx = headers.findIndex(h => h.toLowerCase()==="name");
                  const priceIdx = headers.findIndex(h => h.toLowerCase()==="price");
                  const costIdx = headers.findIndex(h => h.toLowerCase()==="cost");
                  const itemTypeIdx = headers.findIndex(h => h.toLowerCase()==="itemtype" || h.toLowerCase()==="item_type");
                  const skuIdx = headers.findIndex(h => h.toLowerCase()==="sku");
                  const supIdx = headers.findIndex(h => h.toLowerCase()==="supplier");
                  const catIdx = headers.findIndex(h => h.toLowerCase()==="category");
                  const subIdx = headers.findIndex(h => h.toLowerCase()==="subcategory");
                  const descIdx = headers.findIndex(h => h.toLowerCase()==="description");
                  const f1lIdx = headers.findIndex(h => h.toLowerCase()==="filter1_label");
                  const f1vIdx = headers.findIndex(h => h.toLowerCase()==="filter1_value");
                  const f2lIdx = headers.findIndex(h => h.toLowerCase()==="filter2_label");
                  const f2vIdx = headers.findIndex(h => h.toLowerCase()==="filter2_value");
                  const f3lIdx = headers.findIndex(h => h.toLowerCase()==="filter3_label");
                  const f3vIdx = headers.findIndex(h => h.toLowerCase()==="filter3_value");

                  if (nameIdx === -1 || priceIdx === -1) {
                    flash("CSV must have Name and Price columns","er"); return;
                  }

                  // Simple CSV parse (handles quoted fields)
                  const parseCSVLine = line => {
                    const result = []; let current = ""; let inQuotes = false;
                    for (let i = 0; i < line.length; i++) {
                      const c = line[i];
                      if (c === '"') { inQuotes = !inQuotes; }
                      else if (c === ',' && !inQuotes) { result.push(current.trim()); current = ""; }
                      else { current += c; }
                    }
                    result.push(current.trim());
                    return result;
                  };

                  const products = [];
                  for (let i = 1; i < lines.length; i++) {
                    const cols = parseCSVLine(lines[i]);
                    const name = cols[nameIdx] || "";
                    if (!name) continue;
                    const sku = skuIdx >= 0 ? (cols[skuIdx]||"") : "";
                    products.push({
                      id: sku || ("csv_" + i + "_" + Date.now()),
                      name, price: parseFloat(cols[priceIdx]) || 0,
                      cost: costIdx >= 0 ? (parseFloat(cols[costIdx]) || 0) : 0,
                      itemType: itemTypeIdx >= 0 ? (cols[itemTypeIdx]||"Product") : "Product",
                      cat: catIdx >= 0 ? (cols[catIdx]||"General") : "General",
                      sub: subIdx >= 0 ? (cols[subIdx]||"") : "",
                      desc: descIdx >= 0 ? (cols[descIdx]||"") : "",
                      sup: supIdx >= 0 ? (cols[supIdx]||"") : "",
                      sku,
                      supplier: supIdx >= 0 ? (cols[supIdx]||"") : "",
                      f1l: f1lIdx >= 0 ? (cols[f1lIdx]||"") : "",
                      f1v: f1vIdx >= 0 ? (cols[f1vIdx]||"") : "",
                      f2l: f2lIdx >= 0 ? (cols[f2lIdx]||"") : "",
                      f2v: f2vIdx >= 0 ? (cols[f2vIdx]||"") : "",
                      f3l: f3lIdx >= 0 ? (cols[f3lIdx]||"") : "",
                      f3v: f3vIdx >= 0 ? (cols[f3vIdx]||"") : "",
                      custom: true, csvImport: true,
                    });
                  }

                  // Deduplicate IDs
                  const seen = new Set();
                  products.forEach(p => {
                    if (!p.id || seen.has(p.id)) p.id = "csv_" + Math.random().toString(36).substr(2,9);
                    seen.add(p.id);
                  });

                  if (products.length === 0) { flash("No valid products found in CSV","er"); return; }

                  if (!confirm("Import " + products.length + " products from CSV?\n\nThis will ADD them as custom products alongside the embedded pricebook. Existing custom products will be preserved.")) return;

                  saveCP([...customProducts, ...products]);
                  flash("Imported " + products.length + " products from CSV!");
                  document.getElementById("csv-upload").value = "";
                } catch(err) {
                  flash("Error parsing CSV: " + err.message, "er");
                }
              };
              reader.readAsText(file);
            }}/>
            <div style={{fontSize:10,color:"var(--t3)",marginTop:4}}>Products are imported as custom items that overlay the embedded pricebook. They will appear in the appropriate wizard steps based on their name prefix and show in cascading filters based on their filter columns.</div>
          </div>

          <div className="cd" style={{marginTop:12}}>
            <div className="cd-t" style={{marginBottom:8}}>Export Current Pricebook</div>
            <button className="btn bp" onClick={()=>{
              const headers = ["SKU","Name","Price","Cost","Supplier","ItemType","Category","Subcategory","Description","Filter1_Label","Filter1_Value","Filter2_Label","Filter2_Value","Filter3_Label","Filter3_Value"];
              const esc = v => { const s = String(v||""); return s.includes(",") || s.includes('"') || s.includes("\n") ? '"'+s.replace(/"/g,'""')+'"' : s; };
              const rows = [headers.join(",")];
              allProducts.forEach(p => {
                rows.push([p.sku||p.id, p.name, p.price, p.cost||0, p.sup||p.supplier||"", p.itemType||"Product", p.cat, p.sub, p.desc||"", p.f1l||"", p.f1v||"", p.f2l||"", p.f2v||"", p.f3l||"", p.f3v||""].map(esc).join(","));
              });
              const blob = new Blob([rows.join("\n")], {type:"text/csv"});
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a"); a.href = url; a.download = "pricebook_export_" + new Date().toISOString().slice(0,10) + ".csv"; a.click();
              URL.revokeObjectURL(url);
              flash("Exported " + allProducts.length + " products to CSV");
            }}><I name="file" size={12}/> Export CSV</button>
            <div style={{fontSize:10,color:"var(--t3)",marginTop:4}}>Exports all products (embedded + custom) with current prices and filter values. Edit this CSV externally and re-import to update.</div>
          </div>
        </>}

        {adminTab==="log"&&<>
          <div className="cd" style={{background:"linear-gradient(135deg,rgba(59,109,240,.06),rgba(212,164,74,.04))",border:"1px solid rgba(59,109,240,.15)",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>Price Change Log</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>Timestamped history of all price changes — individual edits, base price updates, and bulk adjustments. Stored locally (last 200 entries).</div>
          </div>
          {priceLog.length===0&&<div className="em"><I name="file" size={32}/><p>No price changes recorded yet.</p></div>}
          {priceLog.length>0&&<>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:10,color:"var(--t2)"}}>{priceLog.length} entries</div>
              <button className="btn bs" style={{fontSize:9,color:"var(--er)"}} onClick={()=>{if(confirm("Clear all price change history?")){setPriceLog([]);try{localStorage.removeItem("price_change_log")}catch(e){}flash("Log cleared")}}}>Clear Log</button>
            </div>
            <div style={{maxHeight:500,overflowY:"auto"}}>
              {priceLog.map((e,i) => <div key={i} style={{padding:"8px 10px",borderBottom:"1px solid var(--bd)",fontSize:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <span className={"tg "+(e.action==="bulk_adjust"?"tw":e.action==="base_price_reset_all"?"ter":e.action.includes("base")?"tbl":"tok")} style={{fontSize:8}}>
                    {e.action==="product_edit"?"Product Edit":e.action==="base_price_edit"?"Base Price Edit":e.action==="base_price_reset"?"Base Price Reset":e.action==="base_price_reset_all"?"Reset All Base Prices":e.action==="bulk_adjust"?"Bulk Adjustment":e.action}</span>
                  <span style={{fontSize:9,color:"var(--t3)"}}>{new Date(e.ts).toLocaleString()}</span>
                </div>
                {e.action==="product_edit"&&<div>
                  <div style={{fontWeight:600}}>{e.product||e.productId}</div>
                  {e.oldPrice!==e.newPrice&&<div style={{color:"var(--a2)"}}>Price: {fmt(e.oldPrice||0)} → {fmt(e.newPrice||0)}</div>}
                  {e.oldCost!==e.newCost&&e.newCost>0&&<div style={{color:"var(--t2)"}}>Cost: {fmt(e.oldCost||0)} → {fmt(e.newCost||0)}</div>}
                </div>}
                {e.action==="base_price_edit"&&<div>
                  <div style={{fontWeight:600}}>{e.key} ({e.size} / {e.brand})</div>
                  <div style={{color:"var(--a2)"}}>{fmt(e.oldPrice||0)} → {fmt(e.newPrice||0)}</div>
                </div>}
                {e.action==="base_price_reset"&&<div>
                  <div style={{fontWeight:600}}>{e.key} ({e.size} / {e.brand})</div>
                  <div style={{color:"var(--wn)"}}>Restored to default: {fmt(e.restoredTo||0)}</div>
                </div>}
                {e.action==="base_price_reset_all"&&<div style={{color:"var(--er)",fontWeight:600}}>All {e.count} base price overrides reset to defaults</div>}
                {e.action==="bulk_adjust"&&<div>
                  <div style={{fontWeight:600}}>{e.percentage>0?"+":""}{e.percentage}% applied to {e.scope==="products"?"products only":e.scope==="base"?"base prices only":"products & base prices"}</div>
                  {e.productCount>0&&<div style={{color:"var(--t2)"}}>{e.productCount} products adjusted</div>}
                  {e.basePriceCount>0&&<div style={{color:"var(--t2)"}}>{e.basePriceCount} base prices adjusted</div>}
                </div>}
              </div>)}
            </div>
          </>}
        </>}

      </div>
    </>);
  };

  /* ── PROJECTS ── */
  /* ── REPORTS ── */
  const [rptTab, setRptTab] = useState("overview"); // overview, reps, costs, ranking
  const [rptPeriod, setRptPeriod] = useState(30); // 7 or 30

  const renderReports = () => {
    // Gather all projects with results across all customers
    const allProjs = [];
    customers.forEach(c => {
      (c.projects||[]).forEach(p => {
        allProjs.push({...p, customerName: c.name, customerEmail: c.email, repId: c.created_by||"", repEmail: c.created_by_email||"Unassigned"});
      });
    });

    const now = new Date();
    const cutoff = new Date(now.getTime() - rptPeriod * 24*60*60*1000).toISOString();
    const cutoff24h = new Date(now.getTime() - 24*60*60*1000).toISOString();

    const resulted = allProjs.filter(p => p.result);
    const inPeriod = resulted.filter(p => p.resultDate >= cutoff);
    const sold = inPeriod.filter(p => p.result === "Sold");
    const pitchMiss = inPeriod.filter(p => p.result === "Pitch Miss");
    const noDemo = inPeriod.filter(p => p.result === "No Demo");

    // Unresulted: no result, created more than 24h ago
    const unresulted = allProjs.filter(p => !p.result);
    const parked = unresulted.filter(p => {
      const created = p.orderedAt || p.jobDate || "";
      return created && created >= cutoff24h;
    });
    const unassigned = unresulted.filter(p => {
      const created = p.orderedAt || p.jobDate || "";
      return !created || created < cutoff24h;
    });

    // Default labor cost from admin setting
    const defaultLabor = parseFloat(localStorage.getItem("default_labor_cost")||"0")||0;

    // Rep breakdown
    const reps = {};
    inPeriod.forEach(p => {
      const email = p.repEmail||"Unassigned";
      if (!reps[email]) reps[email] = {email, sold:[], pitchMiss:[], noDemo:[], changeOrders:0, builds:{}};
      if (p.result==="Sold") reps[email].sold.push(p);
      if (p.result==="Pitch Miss") reps[email].pitchMiss.push(p);
      if (p.result==="No Demo") reps[email].noDemo.push(p);
    });

    // Build type breakdown per rep
    Object.values(reps).forEach(r => {
      [...r.sold,...r.pitchMiss].forEach(p => {
        (p.builds||[]).forEach(b => {
          const bt = b.type||"Unknown";
          if (!r.builds[bt]) r.builds[bt] = {sold:0, pitchMiss:0, points:0};
          if (p.result==="Sold") { r.builds[bt].sold++; r.builds[bt].points++; }
          if (p.result==="Pitch Miss") {
            r.builds[bt].pitchMiss++;
            // Check if pitch miss was above bottom
            const cm = calcBuildCommission(b, p);
            if (!cm.belowBottom) r.builds[bt].points--; // loses point if above bottom
          }
        });
      });
    });

    // Cost report for sold jobs
    const costReport = sold.map(p => {
      const retail = pRetail(p);
      const soldAmt = pSold(p);
      const totalCost = (p.builds||[]).reduce((s,b) => {
        const items = (b.items||[]).reduce((s2,l) => s2 + (l.cost||0)*(l.qty||1), 0);
        const extras = (b.extras||[]).reduce((s2,x) => {
          const prod = allProducts.find(pp=>pp.id===x.productId);
          return s2 + (prod?(prod.cost||0):0)*(x.qty||1);
        }, 0);
        return s + items + extras;
      }, 0);
      const labor = p.laborCost || defaultLabor;
      const totalJobCost = totalCost + labor;
      const profit = soldAmt - totalJobCost;
      const profitPct = soldAmt > 0 ? (profit / soldAmt * 100) : 0;
      return {...p, retail, soldAmt, totalCost, labor, totalJobCost, profit, profitPct};
    });

    return (<>
      <div className="tb"><div className="tb-t"><I name="zap" size={14}/> Reports</div></div>
      <div className="ct" style={{maxWidth:900}}>
        <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
          {["overview","reps","costs","ranking"].map(t => <button key={t} className={"btn"+(rptTab===t?" bp":"")} onClick={()=>setRptTab(t)} style={{fontSize:11}}>
            {t==="overview"?"Overview":t==="reps"?"Rep Performance":t==="costs"?"Job Costs":"Rankings"}</button>)}
          <div style={{marginLeft:"auto",display:"flex",gap:2}}>
            <button className={"btn bs"+(rptPeriod===7?" bp":"")} onClick={()=>setRptPeriod(7)} style={{fontSize:10}}>7 Days</button>
            <button className={"btn bs"+(rptPeriod===30?" bp":"")} onClick={()=>setRptPeriod(30)} style={{fontSize:10}}>30 Days</button>
          </div>
        </div>

        {rptTab==="overview"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginBottom:16}}>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--ok)"}}>{sold.length}</div><div style={{fontSize:9,color:"var(--t2)"}}>Sold</div></div>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--er)"}}>{pitchMiss.length}</div><div style={{fontSize:9,color:"var(--t2)"}}>Pitch Miss</div></div>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--wn)"}}>{noDemo.length}</div><div style={{fontSize:9,color:"var(--t2)"}}>No Demo</div></div>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--a2)"}}>{sold.length+pitchMiss.length>0?Math.round(sold.length/(sold.length+pitchMiss.length)*100):0}%</div><div style={{fontSize:9,color:"var(--t2)"}}>Close Rate</div></div>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--t2)"}}>{parked.length}</div><div style={{fontSize:9,color:"var(--t2)"}}>Parked (&lt;24h)</div></div>
            <div className="cd" style={{textAlign:"center",padding:12}}><div style={{fontSize:22,fontWeight:700,color:"var(--wn)"}}>{unassigned.length}</div><div style={{fontSize:9,color:"var(--t2)"}}>Unresulted</div></div>
          </div>
          <div className="cd" style={{marginBottom:12}}>
            <div className="cd-t" style={{marginBottom:6}}>Avg Sold Amount</div>
            <div className="nm" style={{fontSize:18,fontWeight:700,color:"var(--ok)"}}>{sold.length>0?fmt(sold.reduce((s,p)=>s+pSold(p),0)/sold.length):"—"}</div>
          </div>
          <div className="cd" style={{marginBottom:12}}>
            <div className="cd-t" style={{marginBottom:6}}>Avg Pitch Miss Amount</div>
            <div className="nm" style={{fontSize:18,fontWeight:700,color:"var(--er)"}}>{pitchMiss.length>0?fmt(pitchMiss.reduce((s,p)=>s+pSold(p),0)/pitchMiss.length):"—"}</div>
          </div>
          <div className="cd" style={{marginBottom:12}}>
            <div className="cd-t" style={{marginBottom:6}}>Default Labor Cost</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <input className="inp is" type="number" step="0.01" value={defaultLabor||""} onChange={e=>{try{localStorage.setItem("default_labor_cost",e.target.value)}catch(er){}}} style={{width:120}} placeholder="0.00"/>
              <span style={{fontSize:9,color:"var(--t2)"}}>Applied to all sold jobs without individual labor cost</span>
            </div>
          </div>
        </>}

        {rptTab==="reps"&&<>
          {Object.values(reps).sort((a,b)=>b.sold.length-a.sold.length).map(r => {
            const totalJobs = r.sold.length + r.pitchMiss.length;
            const closeRate = totalJobs > 0 ? Math.round(r.sold.length / totalJobs * 100) : 0;
            const avgSold = r.sold.length > 0 ? r.sold.reduce((s,p)=>s+pSold(p),0)/r.sold.length : 0;
            const avgPM = r.pitchMiss.length > 0 ? r.pitchMiss.reduce((s,p)=>s+pSold(p),0)/r.pitchMiss.length : 0;

            return <div key={r.email} className="cd" style={{marginBottom:12}}>
              <div className="cd-h"><div className="cd-t">{r.email}</div>
                <div style={{display:"flex",gap:6}}>
                  <span className="tg tok">{r.sold.length} sold</span>
                  <span className="tg ter">{r.pitchMiss.length} PM</span>
                  <span className="tg tw">{r.noDemo.length} ND</span>
                </div></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginTop:8,fontSize:10}}>
                <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Close Rate</div><div style={{fontWeight:700,color:closeRate>=20?"var(--ok)":"var(--er)"}}>{closeRate}%</div></div>
                <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Avg Sold</div><div className="nm" style={{fontWeight:600}}>{avgSold>0?fmt(avgSold):"—"}</div></div>
                <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Avg Pitch Miss</div><div className="nm" style={{fontWeight:600,color:"var(--er)"}}>{avgPM>0?fmt(avgPM):"—"}</div></div>
                <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Total Jobs</div><div style={{fontWeight:600}}>{r.sold.length+r.pitchMiss.length+r.noDemo.length}</div></div>
              </div>

              {/* Build type breakdown */}
              {Object.keys(r.builds).length>0&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px solid var(--bd)"}}>
                <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",marginBottom:4}}>By Build Type</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:4}}>
                  {Object.entries(r.builds).map(([bt,d])=>{
                    const cr = d.sold+d.pitchMiss>0?Math.round(d.sold/(d.sold+d.pitchMiss)*100):0;
                    return <div key={bt} style={{padding:"4px 6px",background:"var(--ci)",borderRadius:4,fontSize:9}}>
                      <div style={{fontWeight:600}}>{bt}</div>
                      <div>Sold: {d.sold} | PM: {d.pitchMiss} | CR: {cr}%</div>
                    </div>;
                  })}
                </div>
              </div>}

              {/* No Demo reasons */}
              {r.noDemo.length>0&&<div style={{marginTop:6,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
                <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",marginBottom:2}}>No Demo Reasons</div>
                {Object.entries(r.noDemo.reduce((acc,p)=>{const reason=p.noDemoReason||"Unknown";acc[reason]=(acc[reason]||0)+1;return acc},{})).map(([reason,count])=>
                  <div key={reason} style={{fontSize:9,display:"flex",justifyContent:"space-between"}}><span>{reason}</span><span style={{fontWeight:600}}>{count}</span></div>
                )}
              </div>}

              {/* Pitch miss analysis */}
              {r.pitchMiss.length>0&&<div style={{marginTop:6,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
                <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",marginBottom:2}}>Pitch Miss Analysis</div>
                {r.pitchMiss.map(p => {
                  const retail = pRetail(p);
                  const pmAmt = pSold(p);
                  const bottomTotal = (p.builds||[]).reduce((s,b)=>{const cm=calcBuildCommission(b,p);return s+cm.bottomPrice},0);
                  const pctOfBottom = bottomTotal>0?Math.round(pmAmt/bottomTotal*100):0;
                  return <div key={p.id} style={{fontSize:9,padding:"2px 0",display:"flex",justifyContent:"space-between"}}>
                    <span>{p.customerName} — {p.name}</span>
                    <span className="nm">{fmt(pmAmt)} <span style={{color:pmAmt>=bottomTotal?"var(--ok)":"var(--er)"}}>({pctOfBottom}% of bottom)</span></span>
                  </div>;
                })}
              </div>}
            </div>;
          })}
          {Object.keys(reps).length===0&&<div className="em"><I name="users" size={32}/><p>No resulted jobs in this period</p></div>}
        </>}

        {rptTab==="costs"&&<>
          <div className="cd" style={{marginBottom:12,border:"1px solid rgba(212,164,74,.2)",background:"rgba(212,164,74,.04)"}}>
            <div style={{fontSize:11,color:"var(--t2)"}}>Job cost report for {sold.length} sold jobs. Set labor cost per project or use the default labor cost from the Overview tab.</div>
          </div>
          {costReport.map(cr => <div key={cr.id} className="cd" style={{marginBottom:8}}>
            <div className="cd-h"><div style={{fontSize:11,fontWeight:600}}>{cr.customerName} — {cr.name}</div>
              <span style={{fontSize:10,color:"var(--t2)"}}>{cr.repEmail}</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:6,marginTop:6,fontSize:10}}>
              <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Sold</div><div className="nm" style={{fontWeight:600}}>{fmt(cr.soldAmt)}</div></div>
              <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Material Cost</div><div className="nm" style={{fontWeight:600}}>{fmt(cr.totalCost)}</div></div>
              <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Labor</div>
                <DInput className="inp is" type="number" step="0.01" value={cr.laborCost||cr.labor||""} onChange={v=>{
                  updC(cs=>cs.map(c=>({...c,projects:(c.projects||[]).map(p=>p.id===cr.id?{...p,laborCost:v}:p)})));
                }} style={{width:80,fontSize:10}}/></div>
              <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Total Cost</div><div className="nm" style={{fontWeight:600}}>{fmt(cr.totalJobCost)}</div></div>
              <div><div style={{color:"var(--t3)",fontSize:8,textTransform:"uppercase"}}>Profit</div><div className="nm" style={{fontWeight:700,color:cr.profit>0?"var(--ok)":"var(--er)"}}>{fmt(cr.profit)} ({cr.profitPct.toFixed(1)}%)</div></div>
            </div>
          </div>)}
          {costReport.length>0&&<div className="cd" style={{border:"1px solid var(--ok)",background:"rgba(45,212,160,.04)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:6,fontSize:11,fontWeight:700}}>
              <div>Total Sold: {fmt(costReport.reduce((s,c)=>s+c.soldAmt,0))}</div>
              <div>Materials: {fmt(costReport.reduce((s,c)=>s+c.totalCost,0))}</div>
              <div>Labor: {fmt(costReport.reduce((s,c)=>s+c.labor,0))}</div>
              <div>Cost: {fmt(costReport.reduce((s,c)=>s+c.totalJobCost,0))}</div>
              <div style={{color:"var(--ok)"}}>Profit: {fmt(costReport.reduce((s,c)=>s+c.profit,0))}</div>
            </div>
          </div>}
        </>}

        {rptTab==="ranking"&&<>
          <div className="cd" style={{marginBottom:12,border:"1px solid rgba(59,109,240,.2)",background:"rgba(59,109,240,.04)"}}>
            <div style={{fontSize:11,color:"var(--t2)"}}>Points: +1 per sold job. -1 per pitch miss above bottom. Close rate below 20% over 7 days loses a point. Ranked by build type.</div>
          </div>
          {(()=>{
            // Calculate points per rep per build type
            const rankings = {};
            Object.entries(reps).forEach(([email, r]) => {
              Object.entries(r.builds).forEach(([bt, d]) => {
                if (!rankings[bt]) rankings[bt] = [];
                let points = d.points;
                // Check 7-day close rate penalty
                const last7 = new Date(now.getTime()-7*24*60*60*1000).toISOString();
                const r7sold = r.sold.filter(p=>p.resultDate>=last7&&(p.builds||[]).some(b=>b.type===bt)).length;
                const r7pm = r.pitchMiss.filter(p=>p.resultDate>=last7&&(p.builds||[]).some(b=>b.type===bt)).length;
                const r7cr = r7sold+r7pm>0?r7sold/(r7sold+r7pm)*100:100;
                if (r7cr < 20 && (r7sold+r7pm)>0) points--;
                rankings[bt].push({email:r.email, sold:d.sold, pitchMiss:d.pitchMiss, points, closeRate:d.sold+d.pitchMiss>0?Math.round(d.sold/(d.sold+d.pitchMiss)*100):0, cr7:Math.round(r7cr)});
              });
            });

            return Object.entries(rankings).sort().map(([bt, reps2]) => <div key={bt} className="cd" style={{marginBottom:12}}>
              <div className="cd-t" style={{marginBottom:8}}>{bt}</div>
              <table style={{fontSize:10}}><thead><tr>
                <th style={{textAlign:"left"}}>Rank</th>
                <th style={{textAlign:"left"}}>Rep</th>
                <th style={{textAlign:"center"}}>Sold</th>
                <th style={{textAlign:"center"}}>PM</th>
                <th style={{textAlign:"center"}}>CR%</th>
                <th style={{textAlign:"center"}}>7d CR%</th>
                <th style={{textAlign:"center"}}>Points</th>
              </tr></thead><tbody>
                {reps2.sort((a,b)=>b.points-a.points).map((r2,i)=><tr key={r2.email}>
                  <td style={{fontWeight:700,color:i===0?"var(--gd)":i===1?"var(--t2)":"var(--t3)"}}>{i+1}</td>
                  <td>{r2.email}</td>
                  <td style={{textAlign:"center",color:"var(--ok)"}}>{r2.sold}</td>
                  <td style={{textAlign:"center",color:"var(--er)"}}>{r2.pitchMiss}</td>
                  <td style={{textAlign:"center"}}>{r2.closeRate}%</td>
                  <td style={{textAlign:"center",color:r2.cr7<20?"var(--er)":"var(--ok)"}}>{r2.cr7}%</td>
                  <td style={{textAlign:"center",fontWeight:700,color:r2.points>0?"var(--ok)":r2.points<0?"var(--er)":"var(--t2)"}}>{r2.points}</td>
                </tr>)}
              </tbody></table>
            </div>);
          })()}
        </>}

      </div>
    </>);
  };

  const renderProj = () => (<>
    <div className="tb"><div className="tb-t">{aCust&&cur.c?aProj&&cur.p?(cur.c.name+" / "+cur.p.name):cur.c.name:"Customers & Projects"}</div>
      <div className="tb-a">
        {aCust&&!aProj&&<button className="btn bp" onClick={()=>{
          const d=new Date();const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
          const day=d.getDate();const suf=day===1||day===21||day===31?"st":day===2||day===22?"nd":day===3||day===23?"rd":"th";
          setFd({name:months[d.getMonth()]+" "+day+suf+" "+d.getFullYear()});setModal("proj")
        }}><I name="plus" size={11}/> Project</button>}
        {aProj&&!cur.p?.locked&&<button className="btn bp" onClick={()=>{setFd({type:"Full Bathroom Remodel"});setModal("build")}}><I name="plus" size={11}/> New Build</button>}
        {!aCust&&<button className="btn bp" onClick={()=>{setFd({});setModal("cust")}}><I name="plus" size={11}/> Customer</button>}</div></div>
    <div className="ct">
      {aCust&&<div style={{display:"flex",gap:4,alignItems:"center",marginBottom:10,fontSize:10}}>
        <span style={{color:"var(--a2)",cursor:"pointer"}} onClick={()=>{setACust(null);setAProj(null)}}>Customers</span>
        {cur.c&&<><I name="chevR" size={9}/><span style={{color:aProj?"var(--a2)":"var(--tx)",cursor:aProj?"pointer":"default"}} onClick={()=>setAProj(null)}>{cur.c.name}</span></>}
        {cur.p&&<><I name="chevR" size={9}/><span>{cur.p.name}</span></>}</div>}

      {/* Customer search bar */}
      {!aCust&&<div style={{marginBottom:10}}>
        <input className="inp is" placeholder="Search customers by name, email, or phone..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:8}}/>
      </div>}

      {/* Admin: Today's Jobs */}
      {!aCust&&isAdmin&&(()=>{
        const today = new Date().toISOString().slice(0,10);
        const todaysJobs = [];
        customers.forEach(c => {
          (c.projects||[]).forEach(p => {
            const jd = (p.jobDate||"").slice(0,10); // normalize to YYYY-MM-DD
            if (jd && jd === today) {
              todaysJobs.push({customer: c, project: p});
            }
          });
        });
        return <div className="cd" style={{border:"1px solid rgba(45,212,160,.2)",background:"rgba(45,212,160,.04)",marginBottom:12}}>
          <div className="cd-h"><div className="cd-t" style={{color:"var(--ok)"}}>Today's Jobs — {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</div>
            <span className="tg tok">{todaysJobs.length}</span></div>
          {todaysJobs.length > 0 ? todaysJobs.map((j,i) => <div key={i} style={{padding:"6px 0",borderBottom:i<todaysJobs.length-1?"1px solid var(--bd)":"none",cursor:"pointer"}} onClick={()=>{setACust(j.customer.id);setAProj(j.project.id)}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,fontWeight:600}}>{j.customer.name}</div>
                <div style={{fontSize:9,color:"var(--t2)"}}>{j.project.name} — {j.project.builds?j.project.builds.length:0} builds {j.customer.address&&<span>| {j.customer.address}</span>}</div>
                {j.customer.created_by_email&&<div style={{fontSize:9,color:"var(--gd)"}}>Rep: {j.customer.created_by_email}</div>}
              </div>
              <div className="nm" style={{fontWeight:700,fontSize:13,color:"var(--a2)"}}>{fmt(pTot(j.project))}</div>
            </div>
          </div>) : <div style={{fontSize:10,color:"var(--t2)",padding:"4px 0"}}>No jobs scheduled for today</div>}
        </div>;
      })()}

      {/* Admin: filter by sales rep */}
      {!aCust&&isAdmin&&<div className="cd" style={{border:"1px solid rgba(212,164,74,.2)",background:"rgba(212,164,74,.04)",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:10,fontWeight:600,color:"var(--gd)"}}>Admin View</div>
          <select className="inp is" value={viewAsUser||""} onChange={e=>setViewAsUser(e.target.value||null)} style={{flex:1,maxWidth:280}}>
            <option value="">All Sales Reps ({customers.length} customers)</option>
            {allUsers.map(u=><option key={u.id} value={u.id}>{u.email}</option>)}
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>}

      {!aCust&&(()=>{
        let filtered = viewAsUser==="unassigned"?customers.filter(c=>!c.created_by):viewAsUser?customers.filter(c=>c.created_by===viewAsUser):customers;
        if (search) { const s=search.toLowerCase(); filtered=filtered.filter(c=>(c.name||"").toLowerCase().includes(s)||(c.email||"").toLowerCase().includes(s)||(c.phone||"").includes(s)||(c.address||"").toLowerCase().includes(s)); }
        return <>
          {filtered.map(c=>{
            const repLabel = c.created_by_email || allUsers.find(u=>u.id===c.created_by)?.email || (c.created_by?"Unknown Rep":"Unassigned");
            return <div key={c.id} className="cd" style={{cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>{setACust(c.id);setSearch("")}}>
              <div><div style={{fontWeight:600,fontSize:12}}>{c.name}</div>
                <div style={{fontSize:9,color:"var(--t2)"}}>{c.email} {c.phone?"\u00b7 "+c.phone:""}{isAdmin&&<span style={{color:"var(--gd)",marginLeft:6}}>Rep: {repLabel}</span>}</div></div>
              <span className="tg tbl">{c.projects?c.projects.length:0} projects</span></div>
            {isAdmin&&<div style={{display:"flex",alignItems:"center",gap:4,marginTop:4,paddingTop:4,borderTop:"1px solid var(--bd)"}} onClick={e=>e.stopPropagation()}>
              <span style={{fontSize:9,color:"var(--t3)"}}>Assign:</span>
              <select className="inp is" value={c.created_by||""} style={{flex:1,fontSize:10}} onChange={async(e)=>{
                const newRepId = e.target.value;
                const newRepEmail = newRepId ? (allUsers.find(u=>u.id===newRepId)?.email||"") : "";
                updC(cs=>cs.map(cc=>cc.id!==c.id?cc:{...cc,created_by:newRepId||null,created_by_email:newRepEmail}));
                if(supabase){try{await supabase.from('customers').update({created_by:newRepId||null,created_by_email:newRepEmail}).eq('id',c.id);flash("Rep updated for "+c.name)}catch(err){flash("Error updating rep","er")}}
              }}>
                <option value="">Unassigned</option>
                {allUsers.map(u=><option key={u.id} value={u.id}>{u.email}</option>)}
              </select>
            </div>}
          </div>})}
          {!filtered.length&&<div className="em"><I name="users" size={40}/><p>{search?"No customers match \""+search+"\"":viewAsUser?"No customers for this rep.":"Create a customer to start."}</p></div>}
        </>;
      })()}

      {aCust&&!aProj&&cur.c&&<>
        <div className="cd" style={{background:"var(--ci)"}}><div className="g2" style={{fontSize:10}}><div>Email: {cur.c.email}</div><div>Phone: {cur.c.phone}</div><div style={{gridColumn:"1/-1"}}>Address: {cur.c.address}</div></div></div>
        {cur.c.projects&&cur.c.projects.map(p=><div key={p.id} className="cd" style={{cursor:"pointer"}} onClick={()=>setAProj(p.id)}>
          <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:600}}>{p.name}</div><div style={{fontSize:9,color:"var(--t2)"}}>{p.builds?p.builds.length:0} builds</div></div>
            <div className="nm" style={{fontWeight:700,fontSize:14}}>{fmt(pTot(p))}</div></div></div>)}
        {(!cur.c.projects||!cur.c.projects.length)&&<div className="em"><I name="clipboard" size={40}/><p>No projects yet.</p></div>}</>}

      {aProj&&cur.p&&<>
        <div className="sr">
          <div className="ss"><div className="ssl">Builds</div><div className="ssv">{cur.p.builds?cur.p.builds.length:0}</div></div>
          <div className="ss"><div className="ssl">Retail Price</div><div className="ssv nm">{fmt(pRetail(cur.p))}</div></div>
          {pDiscTotal(cur.p)>0&&<div className="ss"><div className="ssl">Discounts</div><div className="ssv nm" style={{color:"var(--ok)"}}>-{fmt(pDiscTotal(cur.p))}</div></div>}
          <div className="ss"><div className="ssl">Project Sold</div><div className="ssv nm" style={{color:"var(--a2)"}}>{fmt(pSold(cur.p))}</div></div>
          {cur.p.orderedAt&&<div className="ss"><div className="ssl">Ordered</div><div className="ssv" style={{fontSize:10}}>{new Date(cur.p.orderedAt).toLocaleDateString()}</div></div>}
          <div className="ss"><div className="ssl">Job Date</div><div className="ssv">
            <input type="date" className="inp is" value={cur.p.jobDate||""} onChange={e=>{
              updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,jobDate:e.target.value})}));
            }} style={{fontSize:10,width:120}}/></div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
            <button className="btn bgd" onClick={()=>setPreview("con")}><I name="file" size={11}/> Contract</button>
            <button className="btn" onClick={()=>setPreview("cv")}><I name="eye" size={11}/> Customer View</button>
            <button className="btn" style={{borderColor:"var(--wn)",color:"var(--wn)"}} onClick={()=>setPreview("wo")}><I name="clipboard" size={11}/> Work Orders</button>
            {cur.p.orderedAt&&<button className="btn" style={{borderColor:"var(--ok)",color:"var(--ok)"}} onClick={()=>setPreview("po")}><I name="package" size={11}/> Purchase Orders</button>}
            {!cur.p.locked&&<button className={"btn "+(sending?"":"bp")} onClick={()=>{if(confirm("Click to confirm processing the order")){sendToGHL("Approved Order")}}} disabled={sending} style={{opacity:sending?.5:1}}>
              <I name="zap" size={11}/> {sending?"Processing...":"Approve Order"}</button>}
            {!cur.p.locked&&<button className="btn" style={{borderColor:"var(--er)",color:"var(--er)"}} onClick={()=>setActionModal("noDemo")} disabled={sending}>
              <I name="x" size={11}/> No Demo</button>}
            {!cur.p.locked&&<button className="btn" style={{borderColor:"var(--wn)",color:"var(--wn)"}} onClick={()=>setActionModal("pitchMiss")} disabled={sending}>
              <I name="alertTri" size={11}/> Pitch Miss</button>}
            <button className="btn" style={{borderColor:"var(--ok)",color:"var(--ok)",opacity:sending?.5:1}} onClick={()=>{setChangeOrder({buildId:"",items:[],chargeable:true});setActionModal("changeOrder")}} disabled={sending}>
              <I name="checkCircle" size={11}/> Change Order</button>
          </div>
          {sendResult&&<div style={{width:"100%",marginTop:6}}>
            <div style={{fontSize:10,padding:"6px 10px",borderRadius:"var(--r)",background:sendResult.ok?"var(--od)":"var(--ed)",color:sendResult.ok?"var(--ok)":"var(--er)",fontWeight:600}}>
              {sendResult.ok?"\u2713 ":"\u2717 "}{sendResult.msg}
              <button className="bg2" style={{marginLeft:8,fontSize:9}} onClick={()=>setSendResult(null)}>dismiss</button>
            </div>
          </div>}
        </div>
        {/* Lock banner */}
        {cur.p.locked&&<div className="cd" style={{border:"2px solid var(--ok)",background:"rgba(45,212,160,.06)",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <I name="check" size={14}/>
              <div><div style={{fontSize:12,fontWeight:700,color:"var(--ok)"}}>Order Approved & Locked</div>
                <div style={{fontSize:9,color:"var(--t2)"}}>This project is locked. Use Change Order for modifications, or unlock to make direct edits.</div></div>
            </div>
            <button className="btn bs" style={{borderColor:"var(--wn)",color:"var(--wn)"}} onClick={()=>{
              if(confirm("Unlock this project for editing? Changes will need to be re-approved.")){
                updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,locked:false})}));
                if(supabase){supabase.from('projects').update({locked:false}).eq('id',cur.p.id).then(()=>{});}
                flash("Project unlocked for editing");
              }
            }}>Unlock</button>
          </div>
        </div>}

        {cur.p.builds&&cur.p.builds.map(b=>{const sub=bSub(b),dt=bDiscTotal(b);return <div key={b.id} className="cd">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div><div style={{fontWeight:600,fontSize:13}}>{b.name}</div>
              <div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}><span className="tg tbl">{b.type}</span>
                <span className={"tg "+(b.status==="configured"?"tok":"tw")}>{b.status}</span>
                {b.wizConfig&&b.wizConfig.brand&&<span className="tg tw">{b.wizConfig.brand}</span>}
                {b.wizConfig&&b.wizConfig.vanityType&&<span className="tg tw">{b.wizConfig.vanityType}</span>}
                {b.wizConfig&&b.wizConfig.size&&<span className="tg tw">{b.wizConfig.size}</span>}
                {b.wizConfig&&b.wizConfig.sinkBase&&<span className="tg tw">{b.wizConfig.sinkBase}</span>}</div>
              <div style={{fontSize:10,color:"var(--t2)",marginTop:4}}>{b.items?b.items.length:0} items {b.extras&&b.extras.length>0&&<span>| {b.extras.length} extras</span>} {b.payType&&<span>| {b.payType}</span>} {b.finType&&<span>| {b.finType}</span>}</div></div>
            <div style={{textAlign:"right"}}>
              <div className="nm" style={{fontWeight:700,fontSize:16}}>{fmt(bSub(b))}</div>
              <div style={{display:"flex",gap:3,marginTop:4,justifyContent:"flex-end"}}>
                {!cur.p.locked&&<button className="btn bs" onClick={()=>openWiz(aCust,aProj,b.id)}>
                  {b.status==="configured"?"Edit":"Configure"} <I name="chevR" size={10}/></button>}
                {!cur.p.locked&&(confirmDel===b.id
                  ? <><button className="btn bs" style={{background:"var(--er)",borderColor:"var(--er)",color:"#fff"}} onClick={()=>deleteBuild(b.id)}>Confirm Delete</button>
                    <button className="btn bs" onClick={()=>setConfirmDel(null)}>Cancel</button></>
                  : <button className="btn bs" style={{borderColor:"var(--er)",color:"var(--er)"}} onClick={()=>setConfirmDel(b.id)}>
                    <I name="trash" size={10}/></button>
                )}</div></div></div>
          {/* Per-build extras panel */}
          {!cur.p.locked&&<div style={{marginTop:8}}><ExtrasPanel extras={b.extras} buildType={b.type} onUpdate={newE=>{
            updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.map(bb=>bb.id!==b.id?bb:{...bb,extras:newE})})}));
          }}/></div>}
          {/* Show extras as read-only when locked */}
          {cur.p.locked&&b.extras&&b.extras.length>0&&<div className="cd" style={{marginTop:8}}>
            <div style={{fontSize:9,fontWeight:600,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>Extras / Add-Ons ({b.extras.length})</div>
            {b.extras.map(x=>{const lp=x.linkedProductId?allProducts.find(p=>p.id===x.linkedProductId):null;return <div key={x.id} style={{padding:"4px 0",borderBottom:"1px solid var(--bd)",fontSize:10}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:600}}>{x.name}{lp&&<span style={{color:"var(--a2)",marginLeft:4}}>→ {lp.name}</span>}</div>
                <div className="nm" style={{fontWeight:600,color:"var(--wn)"}}>{fmt((x.price||0)*(x.qty||1)+(x.customAmt||0))}</div>
              </div>
              {x.note&&<div style={{fontSize:9,color:"var(--t2)",fontStyle:"italic"}}>Note: {x.note}</div>}
            </div>;})}
          </div>}
          {/* Per-build payment type & financing */}
          <div className="cd" style={{marginTop:8,border:"1px solid rgba(59,109,240,.15)",background:"rgba(59,109,240,.03)"}}>
            <div className="cd-t" style={{color:"var(--a2)",marginBottom:6}}>Payment & Financing — {b.name}</div>
            <div className="g2">
              <div className="ig"><label>Payment Type</label>
                <select className="inp is" value={b.payType||""} disabled={cur.p.locked} onChange={e=>updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.map(bb=>bb.id!==b.id?bb:{...bb,payType:e.target.value})})}))}>
                  <option value="">Select...</option><option>Cash</option><option>Check</option><option>Credit Card</option><option>Zero Down Financing</option></select></div>
              <div className="ig"><label>Financing Type</label>
                <select className="inp is" value={b.finType||""} disabled={cur.p.locked} onChange={e=>updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.map(bb=>bb.id!==b.id?bb:{...bb,finType:e.target.value})})}))}>
                  <option value="">No Financing</option><option>15 Year Financing</option><option>10 Year Financing</option><option>1 Year Same as Cash</option></select></div>
            </div>
          </div>
          {/* Below-bottom alert only (commission details hidden from sales rep) */}
          {(()=>{
            const cm = calcBuildCommission(b, cur.p);
            return cm.belowBottom ? <div className="cd" style={{marginTop:8,border:"2px solid var(--er)",background:"rgba(255,59,48,.05)"}}>
              <div style={{padding:"8px 10px",fontSize:11,fontWeight:700,color:"var(--er)",display:"flex",alignItems:"center",gap:6}}>
                <I name="alertTri" size={14}/> Your Project is below Bottom, please adjust your discounts</div>
            </div> : null;
          })()}
          {/* Per-build payment terms */}
          {(()=>{
            const pt=b.payTerms||{p1:25,p1l:"Due at Signing",p2:25,p2l:"Due at Start",p3:0,p3l:"Due at Midpoint",p4:50,p4l:"Due upon Completion",useP3:false,payMode:"pct"};
            const cm=calcBuildCommission(b, cur.p);
            const bt=cm.buildSold||bSub(b);
            const mode=pt.payMode||"pct";
            const updBPT=(field,val)=>updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,builds:p.builds.map(bb=>bb.id!==b.id?bb:{...bb,payTerms:{...pt,[field]:val}})})}));
            // Override mode on all slots
            const ptWithMode = {...pt, p1m:mode, p2m:mode, p3m:mode, p4m:mode};
            const totalAmt = calcPayAmt(ptWithMode,"p1",bt)+calcPayAmt(ptWithMode,"p2",bt)+(pt.useP3?calcPayAmt(ptWithMode,"p3",bt):0)+calcPayAmt(ptWithMode,"p4",bt);
            return <div className="cd" style={{marginTop:8,border:"1px solid rgba(59,109,240,.15)",background:"rgba(59,109,240,.03)"}}>
              <div className="cd-h"><div className="cd-t" style={{color:"var(--a2)"}}>Payment Schedule — {b.name}</div>
                <div style={{display:"flex",gap:2}}>
                  <button className={"btn bs"} style={{fontSize:9,padding:"2px 8px",background:mode==="pct"?"var(--ad)":"transparent",color:mode==="pct"?"var(--a2)":"var(--t3)",borderColor:mode==="pct"?"var(--ac)":"var(--bd)"}} onClick={()=>updBPT("payMode","pct")}>% Percentage</button>
                  <button className={"btn bs"} style={{fontSize:9,padding:"2px 8px",background:mode==="fixed"?"var(--od)":"transparent",color:mode==="fixed"?"var(--ok)":"var(--t3)",borderColor:mode==="fixed"?"var(--ok)":"var(--bd)"}} onClick={()=>updBPT("payMode","fixed")}>$ Fixed</button>
                </div></div>
              <div style={{display:"grid",gridTemplateColumns:pt.useP3?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",gap:6}}>
                {["p1","p2",pt.useP3?"p3":null,"p4"].filter(Boolean).map(slot => {
                  const labels={p1:"1st Payment",p2:"2nd Payment",p3:"3rd Payment",p4:"Final Payment"};
                  const val = pt[slot]||0;
                  const amt = calcPayAmt(ptWithMode, slot, bt);
                  return <div key={slot} className="ig">
                    <label>{labels[slot]} {mode==="pct"?"(%)":"($)"}</label>
                    <input className="inp is" type="number" step={mode==="fixed"?"0.01":"1"} value={val||""} onChange={e=>updBPT(slot,parseFloat(e.target.value)||0)} placeholder={mode==="pct"?"25":"10000"}/>
                    <div style={{fontSize:9,color:"var(--t2)",marginTop:1}}>{pt[slot+"l"]||labels[slot]}</div>
                    <div style={{fontSize:10,color:"var(--a2)",fontWeight:600}} className="nm">{fmt(amt)}</div>
                  </div>;
                })}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <label style={{display:"flex",alignItems:"center",gap:5,fontSize:10,cursor:"pointer"}}><input type="checkbox" checked={pt.useP3||false} onChange={e=>updBPT("useP3",e.target.checked)}/> Add 3rd payment (midpoint)</label>
                <div style={{fontSize:10,fontWeight:600,color:Math.abs(totalAmt-bt)<1?"var(--ok)":"var(--er)"}} className="nm">Total: {fmt(totalAmt)} / {fmt(bt)}</div>
              </div>
            </div>;
          })()}
        </div>})}

        {/* Project-level Discounts */}
        {cur.p.builds&&cur.p.builds.length>0&&!cur.p.locked&&<div style={{marginTop:12}}>
          <DiscountPanel discounts={cur.p.discounts} subtotal={pRetail(cur.p)} level="Project" onUpdate={newD=>{
            updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,discounts:newD})}));
          }}/>
        </div>}
        {/* Show discounts as read-only when locked */}
        {cur.p.locked&&cur.p.discounts&&cur.p.discounts.length>0&&<div className="cd" style={{marginTop:12,border:"1px solid rgba(45,212,160,.2)",background:"rgba(45,212,160,.04)"}}>
          <div className="cd-t" style={{color:"var(--ok)",marginBottom:6}}>Project Discounts (Locked)</div>
          {calcDiscountBreakdown(cur.p.discounts, pRetail(cur.p)).map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderBottom:"1px solid var(--bd)"}}>
            <span>{d.name} {d.count>1?"x"+d.count:""} <span style={{color:"var(--t3)"}}>{d.type==="percent"?d.amount+"%":"$"+d.amount}</span></span>
            <span style={{color:"var(--ok)",fontWeight:600}} className="nm">-{fmt(d.savedAmt)}</span>
          </div>)}
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:12,marginTop:6,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
            <span>Total Discounts</span>
            <span style={{color:"var(--ok)"}} className="nm">-{fmt(pDiscTotal(cur.p))}</span>
          </div>
        </div>}

        {/* Combined Payment Summary */}
        {cur.p.builds&&cur.p.builds.length>0&&(()=>{
          const builds = cur.p.builds;
          const projectSoldAmt = pSold(cur.p);
          const projectRetailAmt = pRetail(cur.p);
          const {signing, start, mid, final2, hasMid} = calcCombinedPayments(builds, projectRetailAmt, projectSoldAmt);
          return <div className="cd" style={{border:"1px solid var(--ac)",background:"rgba(59,109,240,.05)"}}>
            <div className="cd-t" style={{color:"var(--a2)",marginBottom:8}}>Combined Payment Summary</div>
            <div style={{display:"grid",gridTemplateColumns:hasMid?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",gap:10}}>
              <div><div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em"}}>Due at Signing</div><div className="nm" style={{fontSize:16,fontWeight:700,color:"var(--a2)"}}>{fmt(signing)}</div></div>
              <div><div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em"}}>Due at Start</div><div className="nm" style={{fontSize:16,fontWeight:700}}>{fmt(start)}</div></div>
              {hasMid&&<div><div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em"}}>Due at Midpoint</div><div className="nm" style={{fontSize:16,fontWeight:700}}>{fmt(mid)}</div></div>}
              <div><div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em"}}>Due upon Completion</div><div className="nm" style={{fontSize:16,fontWeight:700}}>{fmt(final2)}</div></div>
            </div>
            <div style={{fontSize:9,color:"var(--t3)",fontStyle:"italic",marginTop:8,paddingTop:6,borderTop:"1px solid var(--bd)"}}>Payment due dates are subject to change based upon material availability and installation scheduling.</div>
          </div>;
        })()}
        {(!cur.p.builds||!cur.p.builds.length)&&<div className="em"><I name="package" size={40}/><p>Add a build to start the wizard.</p></div>}</>}
    </div>

    {preview==="cv"&&cur.p&&<div className="mo" onClick={()=>setPreview(null)}><div className="ml" style={{maxWidth:660,padding:0,background:"transparent",border:"none",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4,position:"sticky",top:0,zIndex:1}}><button className="btn bs" style={{background:"#fff",color:"#333"}} onClick={()=>setPreview(null)}>Close</button></div>
      <div className="cv"><h2>Project Estimate</h2><div className="sub">{cur.c?cur.c.name:""} {cur.p.name?"\u00b7 "+cur.p.name:""}</div>
        {cur.p.builds&&cur.p.builds.map(b=>{const tot=bTot(b),dt=bDiscTotal(b),sow=SOW[b.type];return <div key={b.id} className="bc">
          <div style={{fontWeight:600,fontSize:13,marginBottom:2}}>{b.name}</div>
          <div style={{fontSize:10,color:"#888",marginBottom:8}}>{b.type} {b.wizConfig&&b.wizConfig.brand?"\u00b7 "+b.wizConfig.brand:""} {b.wizConfig&&b.wizConfig.size?"\u00b7 "+b.wizConfig.size:""}</div>
          {/* SOW description */}
          {sow&&<div style={{fontSize:10,color:"#2a6e2a",fontWeight:600,marginBottom:6}}>{sow.guarantee}</div>}
          {sow&&sow.steps&&<div style={{marginBottom:8,paddingBottom:6,borderBottom:"1px solid #eee"}}>
            {sow.steps.map((s,si)=><div key={si} style={{fontSize:10,color:"#555",lineHeight:1.5}}>{si+1}. {s}</div>)}
          </div>}
          {/* Line items with work notes */}
          {b.items&&b.items.map(l=><div key={l.id} style={{padding:"3px 0",borderBottom:"1px solid #f0f0f0"}}>
            <div className="ln"><span>{l.productName||l.stepLabel||"Item"} x {l.qty}</span></div>
            {l.note&&<div style={{fontSize:9,color:"#888",fontStyle:"italic",paddingLeft:8}}>Note: {l.note}</div>}
          </div>)}
          {/* Extras */}
          {b.extras&&b.extras.length>0&&<>
            <div style={{fontSize:10,fontWeight:600,color:"#888",marginTop:6,marginBottom:2}}>Additional Work</div>
            {b.extras.map(x=>{const lp=x.linkedProductId?allProducts.find(p=>p.id===x.linkedProductId):null;return <div key={x.id} style={{padding:"3px 0",borderBottom:"1px solid #f0f0f0"}}>
              <div className="ln"><span>{x.name} x {x.qty||1}</span></div>
              {lp&&<div style={{fontSize:9,color:"#2a6bcc",paddingLeft:8}}>→ {lp.name}</div>}
              {x.note&&<div style={{fontSize:9,color:"#888",fontStyle:"italic",paddingLeft:8}}>Note: {x.note}</div>}
            </div>})}
          </>}
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,borderTop:"1px solid #e0e0e0",paddingTop:4,marginTop:2}}><span>{b.name} (Retail)</span><span>{fmt(bSub(b))}</span></div></div>})}
        {pDiscTotal(cur.p)>0&&<div style={{padding:"6px 0"}}>
          <div style={{fontSize:10,fontWeight:600,color:"#888",marginBottom:2}}>Project Discounts</div>
          {calcDiscountBreakdown(cur.p.discounts||[],pRetail(cur.p)).map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"2px 0",color:"#2a9d6e"}}><span>{d.name} {d.count>1?"x"+d.count:""}</span><span style={{fontWeight:600}}>-{fmt(d.savedAmt)}</span></div>)}
        </div>}
        <div className="tot"><span>Contract Total</span><span>{fmt(pSold(cur.p))}</span></div>
        {/* Payment schedule - combined from all builds */}
        {(()=>{
          const builds=cur.p.builds||[];
          const projectRetailAmt=pRetail(cur.p),projectSoldAmt=pSold(cur.p);
          const {signing,start,mid,final2,hasMid}=calcCombinedPayments(builds,projectRetailAmt,projectSoldAmt);
          return <div style={{marginTop:10,fontSize:11,color:"#666"}}>
            <div style={{fontWeight:600,color:"#333",marginBottom:4}}>Payment Schedule</div>
            <div>Due at Signing: <strong>{fmt(signing)}</strong></div>
            <div>Due at Start: <strong>{fmt(start)}</strong></div>
            {hasMid&&<div>Due at Midpoint: <strong>{fmt(mid)}</strong></div>}
            <div>Due upon Completion: <strong>{fmt(final2)}</strong></div>
            <div style={{fontStyle:"italic",marginTop:6,fontSize:10,color:"#999"}}>Payment due dates are subject to change based upon material availability and installation scheduling.</div>
          </div>;
        })()}
      </div></div></div>}

    {/* No Demo Modal */}
    {actionModal==="noDemo"&&cur.p&&<div className="mo" onClick={()=>setActionModal(null)}><div className="ml" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
      <div className="mlt">No Demo</div>
      <p style={{fontSize:11,color:"var(--t2)",marginBottom:12}}>Select the reason this project did not result in a demo, then process to send to CRM.</p>
      <div className="ig"><label>Reason</label>
        <select className="inp" value={noDemoReason} onChange={e=>setNoDemoReason(e.target.value)}>
          <option value="">Select a reason...</option>
          <option value="Not Home">Not Home</option>
          <option value="Not Able to Complete">Not Able to Complete</option>
          <option value="Wrong Product">Wrong Product</option>
          <option value="Didn't Approve Our Product Selection">Didn&apos;t Approve Our Product Selection</option>
          <option value="Other">Other</option>
        </select></div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:12}}>
        <button className="btn" onClick={()=>setActionModal(null)}>Cancel</button>
        <button className="btn bp" disabled={!noDemoReason||sending} style={{opacity:noDemoReason&&!sending?1:.4}} onClick={async()=>{
          // Persist result
          const now = new Date().toISOString();
          updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,result:"No Demo",resultDate:now,noDemoReason})}));
          if(supabase){try{await supabase.from('projects').update({result:'No Demo',result_date:now,no_demo_reason:noDemoReason,status:'no_demo'}).eq('id',cur.p.id)}catch(e){}}
          await sendToGHL("No Demo");setActionModal(null);setNoDemoReason("")}}>
          {sending?"Processing...":"Process No Demo"}</button>
      </div>
    </div></div>}

    {/* Pitch Miss Modal */}
    {actionModal==="pitchMiss"&&cur.p&&<div className="mo" onClick={()=>setActionModal(null)}><div className="ml" style={{maxWidth:460}} onClick={e=>e.stopPropagation()}>
      <div className="mlt">Pitch Miss</div>
      <p style={{fontSize:11,color:"var(--t2)",marginBottom:12}}>Review the amounts below and process to record this pitch miss in CRM.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <div className="cd" style={{textAlign:"center",padding:16}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--t3)",marginBottom:4}}>List Price Amount</div>
          <div style={{fontSize:9,color:"var(--t2)",marginBottom:2}}>Subtotal before any discounts</div>
          <div className="nm" style={{fontSize:22,fontWeight:700,color:"var(--tx)"}}>{fmt((cur.p.builds||[]).reduce((s,b)=>s+bSub(b),0))}</div>
        </div>
        <div className="cd" style={{textAlign:"center",padding:16}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--t3)",marginBottom:4}}>Pitch Miss Amount</div>
          <div style={{fontSize:9,color:"var(--t2)",marginBottom:2}}>Total after all discounts</div>
          <div className="nm" style={{fontSize:22,fontWeight:700,color:"var(--er)"}}>{fmt(pTot(cur.p))}</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",gap:6}}>
        <button className="btn" onClick={()=>setActionModal(null)}>Cancel</button>
        <button className="btn" style={{background:"var(--er)",borderColor:"var(--er)",color:"#fff"}} disabled={sending} onClick={async()=>{
          const now = new Date().toISOString();
          updC(cs=>cs.map(c=>c.id!==aCust?c:{...c,projects:c.projects.map(p=>p.id!==aProj?p:{...p,result:"Pitch Miss",resultDate:now})}));
          if(supabase){try{await supabase.from('projects').update({result:'Pitch Miss',result_date:now,status:'pitch_miss'}).eq('id',cur.p.id)}catch(e){}}
          await sendToGHL("Pitch Miss");setActionModal(null)}}>
          {sending?"Processing...":"Process Pitch Miss"}</button>
      </div>
    </div></div>}

    {/* Change Order Modal */}
    {actionModal==="changeOrder"&&cur.p&&<div className="mo" onClick={()=>setActionModal(null)}><div className="ml" style={{maxWidth:620,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div className="mlt">Change Order</div>
      {(()=>{
        const orderedAt = cur.p.orderedAt;
        const daysSince = orderedAt ? Math.floor((Date.now() - new Date(orderedAt).getTime()) / (1000*60*60*24)) : null;
        const pastWindow = daysSince !== null && daysSince > 7;
        const builds = cur.p.builds || [];
        const selBuild = builds.find(b => b.id === changeOrder.buildId);
        const coItems = changeOrder.items || [];

        const addCOItem = (type) => {
          setChangeOrder({...changeOrder, items:[...coItems, {id:gid(), type, buildId:changeOrder.buildId, stepLabel:"", oldProduct:"", newProduct:"", price:0, qty:1, note:""}]});
        };
        const updCOItem = (id, field, val) => {
          setChangeOrder({...changeOrder, items:coItems.map(x => x.id===id ? {...x, [field]:val} : x)});
        };
        const rmCOItem = (id) => {
          setChangeOrder({...changeOrder, items:coItems.filter(x => x.id!==id)});
        };

        return <>
          {!orderedAt&&<div style={{padding:"8px 12px",background:"rgba(59,109,240,.06)",borderRadius:"var(--r)",marginBottom:10,fontSize:11,color:"var(--a2)"}}>
            <I name="alertTri" size={12}/> This project has not been approved yet. Approve the order first before creating a change order.</div>}
          {orderedAt&&<div style={{fontSize:10,color:"var(--t2)",marginBottom:8}}>Original order date: <strong>{new Date(orderedAt).toLocaleDateString()}</strong> ({daysSince} day{daysSince!==1?"s":""} ago)</div>}
          {pastWindow&&<div style={{padding:"8px 12px",background:"var(--ed)",borderRadius:"var(--r)",marginBottom:10,fontSize:11,fontWeight:700,color:"var(--er)",display:"flex",alignItems:"center",gap:6}}>
            <I name="alertTri" size={14}/> This change order is past the 7-day window ({daysSince} days since original order). Additional charges may apply.</div>}

          <div className="ig"><label>Build</label>
            <select className="inp is" value={changeOrder.buildId} onChange={e=>setChangeOrder({...changeOrder,buildId:e.target.value,items:coItems.map(x=>({...x,buildId:e.target.value}))})}>
              <option value="">Select build...</option>
              {builds.map(b => <option key={b.id} value={b.id}>{b.name} — {b.type}</option>)}
            </select></div>

          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <label style={{display:"flex",alignItems:"center",gap:5,fontSize:11,cursor:"pointer",fontWeight:600}}>
              <input type="radio" name="co_charge" checked={changeOrder.chargeable===true} onChange={()=>setChangeOrder({...changeOrder,chargeable:true})}/> Chargeable</label>
            <label style={{display:"flex",alignItems:"center",gap:5,fontSize:11,cursor:"pointer",fontWeight:600}}>
              <input type="radio" name="co_charge" checked={changeOrder.chargeable===false} onChange={()=>setChangeOrder({...changeOrder,chargeable:false})}/> No Charge</label>
          </div>

          {selBuild&&<>
            <div style={{display:"flex",gap:4,marginBottom:10}}>
              <button className="btn bs bp" onClick={()=>addCOItem("add")} style={{fontSize:10}}><I name="plus" size={10}/> Add Item</button>
              <button className="btn bs" style={{fontSize:10,borderColor:"var(--wn)",color:"var(--wn)"}} onClick={()=>addCOItem("swap")}><I name="file" size={10}/> Swap Item</button>
              <button className="btn bs" style={{fontSize:10,borderColor:"var(--er)",color:"var(--er)"}} onClick={()=>addCOItem("remove")}><I name="trash" size={10}/> Remove Item</button>
            </div>

            {coItems.length>0&&<div style={{marginBottom:10}}>
              {coItems.map(item => {
                // Get the steps for this build type
                const buildSteps = getSteps(selBuild.type, selBuild.wizConfig||{});
                // Get the current item in the build for the selected step
                const buildItem = item.stepKey ? (selBuild.items||[]).find(l=>l.stepKey===item.stepKey) : null;
                // Get products for the selected step (for new product selection)
                const stepDef = item.stepKey ? buildSteps.find(s=>s.key===item.stepKey) : null;
                const stepProducts = stepDef ? getProds(stepDef, selBuild.wizConfig||{}) : [];

                return <div key={item.id} style={{padding:"10px",borderBottom:"1px solid var(--bd)",marginBottom:4,background:"var(--ci)",borderRadius:"var(--r)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span className={"tg "+(item.type==="add"?"tok":item.type==="swap"?"tw":"ter")} style={{fontSize:9}}>
                    {item.type==="add"?"Add New":item.type==="swap"?"Swap Out":"Remove"}</span>
                  <button className="bg2" style={{color:"var(--er)"}} onClick={()=>rmCOItem(item.id)}><I name="x" size={11}/></button>
                </div>

                {/* Step/Category selector */}
                <div className="ig"><label>Step / Category</label>
                  <select className="inp is" value={item.stepKey||""} onChange={e=>{
                    const sk = e.target.value;
                    const bi = sk ? (selBuild.items||[]).find(l=>l.stepKey===sk) : null;
                    updCOItem(item.id, "stepKey", sk);
                    updCOItem(item.id, "stepLabel", bi?bi.stepLabel:(buildSteps.find(s=>s.key===sk)?.label||sk));
                    if (bi && (item.type==="swap"||item.type==="remove")) {
                      updCOItem(item.id, "oldProduct", bi.productName||"");
                      updCOItem(item.id, "oldProductId", bi.productId||"");
                    }
                  }}>
                    <option value="">Select step...</option>
                    {item.type==="add" ? 
                      buildSteps.map(s => <option key={s.key} value={s.key}>{s.label}</option>)
                    :
                      (selBuild.items||[]).filter(l=>l.productId!=="NONE"&&l.productId!=="BASE"&&l.productId!=="CUST_SUPPLIED").map(l => 
                        <option key={l.stepKey} value={l.stepKey}>{l.stepLabel} — {l.productName}</option>)
                    }
                    {(selBuild.extras||[]).length>0&&<option value="_extras">Extras / Add-On</option>}
                  </select></div>

                {/* Original product (auto-populated for swap/remove) */}
                {(item.type==="swap"||item.type==="remove")&&buildItem&&<div style={{padding:"6px 8px",background:"rgba(240,96,96,.06)",border:"1px solid rgba(240,96,96,.15)",borderRadius:"var(--r)",marginBottom:6,fontSize:10}}>
                  <div style={{fontSize:8,fontWeight:600,color:"var(--er)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Current Product</div>
                  <div style={{fontWeight:600}}>{buildItem.productName}</div>
                  <div style={{color:"var(--t2)"}}>{fmt(buildItem.price)} x {buildItem.qty}</div>
                </div>}

                {/* New product selector (for add and swap) */}
                {(item.type==="add"||item.type==="swap")&&item.stepKey&&item.stepKey!=="_extras"&&<div className="ig"><label>New Product</label>
                  <select className="inp is" value={item.newProductId||""} onChange={e=>{
                    const pid = e.target.value;
                    const prod = stepProducts.find(p=>p.id===pid);
                    if(prod){
                      updCOItem(item.id, "newProductId", pid);
                      updCOItem(item.id, "newProduct", prod.name);
                      updCOItem(item.id, "price", prod.price||0);
                    }
                  }}>
                    <option value="">Select product...</option>
                    {stepProducts.filter(p=>{const u=p.name.toUpperCase();return !(u.includes("- NONE")||u.endsWith("NONE")||u.includes(", NONE")||u.includes("- NA,")||u.endsWith(", NA")||u.endsWith("- NA"));}).map(p=>
                      <option key={p.id} value={p.id}>{p.name} — {p.price>0?fmt(p.price):"Included"}</option>)}
                  </select>
                  {item.newProduct&&<div style={{fontSize:9,color:"var(--ok)",marginTop:2}}>Selected: {item.newProduct}</div>}
                </div>}

                <div className="g2">
                  {changeOrder.chargeable&&<div className="ig"><label>Price</label>
                    <input className="inp is" type="number" step="0.01" value={item.price||""} onChange={e=>updCOItem(item.id,"price",parseFloat(e.target.value)||0)} placeholder="0.00"/></div>}
                  <div className="ig"><label>Qty</label>
                    <input className="inp is" type="number" min="1" value={item.qty||1} onChange={e=>updCOItem(item.id,"qty",Math.max(1,parseInt(e.target.value)||1))}/></div>
                </div>
                <div className="ig"><label>Note</label>
                  <input className="inp is" value={item.note||""} onChange={e=>updCOItem(item.id,"note",e.target.value)} placeholder="Change order notes..."/></div>
              </div>;})}
            </div>}
          </>}

          {coItems.length>0&&changeOrder.chargeable&&<div style={{padding:"8px 10px",background:"rgba(45,212,160,.04)",borderRadius:"var(--r)",marginBottom:10,fontSize:11}}>
            <strong>Change Order Total: </strong><span className="nm" style={{fontWeight:700,color:"var(--ok)"}}>{fmt(coItems.reduce((s,x)=>(x.type==="remove"?s:s+(x.price||0)*(x.qty||1)),0))}</span>
          </div>}
          {coItems.length>0&&!changeOrder.chargeable&&<div style={{padding:"8px 10px",background:"rgba(59,109,240,.04)",borderRadius:"var(--r)",marginBottom:10,fontSize:11,fontWeight:600,color:"var(--a2)"}}>
            No Charge Change Order — materials change only, no additional cost to customer</div>}

          <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:12}}>
            <button className="btn" onClick={()=>setActionModal(null)}>Cancel</button>
            <button className="btn bp" disabled={!changeOrder.buildId||coItems.length===0||sending} style={{opacity:changeOrder.buildId&&coItems.length>0&&!sending?1:.4}}
              onClick={async()=>{
                if(pastWindow && !confirm("This change order is past the 7-day window. Are you sure you want to proceed?")){return;}
                // Build change order payload
                const coPayload = {
                  change_order: {
                    build_id: changeOrder.buildId,
                    build_name: selBuild?selBuild.name:"",
                    build_type: selBuild?selBuild.type:"",
                    chargeable: changeOrder.chargeable,
                    past_window: pastWindow,
                    days_since_order: daysSince,
                    original_order_date: orderedAt||"",
                    items: coItems.map(x=>({type:x.type,step:x.stepLabel,old_product:x.oldProduct||"",new_product:x.newProduct||"",price:changeOrder.chargeable?(x.price||0):0,quantity:x.qty||1,note:x.note||""})),
                    total: changeOrder.chargeable?coItems.reduce((s,x)=>(x.type==="remove"?s:s+(x.price||0)*(x.qty||1)),0):0,
                  }
                };
                // Merge with full project payload
                const fullPayload = buildWebhookPayload("Change Order");
                if(fullPayload){
                  Object.assign(fullPayload, coPayload);
                  setSending(true);setSendResult(null);
                  try{
                    const res = await fetch(ghl.webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fullPayload)});
                    if(res.ok){setSendResult({ok:true,msg:"Change order submitted!"});flash("Change order submitted!");}
                    else{const txt=await res.text().catch(()=>"");setSendResult({ok:false,msg:"Webhook returned "+res.status+". "+txt.slice(0,200)});flash("Webhook error: "+res.status,"er");}
                  }catch(e){setSendResult({ok:false,msg:"Network error: "+e.message});flash("Failed: "+e.message,"er");}
                  setSending(false);
                }
                setActionModal(null);
              }}>
              {sending?"Processing...":"Submit Change Order"}</button>
          </div>
        </>;
      })()}
    </div></div>}

    {/* Work Order Preview (installer-facing, with full pricing + details) */}
    {preview==="wo"&&cur.p&&<div className="mo" onClick={()=>setPreview(null)}><div className="ml" style={{maxWidth:780,padding:0,background:"transparent",border:"none",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"flex-end",gap:4,marginBottom:4,position:"sticky",top:0,zIndex:1}}>
        <button className="btn bs" style={{background:"var(--c1)"}} onClick={()=>setPreview("json")}><I name="zap" size={10}/> View JSON</button>
        <button className="btn bs" style={{background:"#fff",color:"#333"}} onClick={()=>setPreview(null)}>Close</button>
      </div>
      <div style={{padding:4}}>
        <div style={{background:"#1a1a1a",color:"#fff",padding:14,borderRadius:8,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#888"}}>Installer Work Orders</div>
              <div style={{fontSize:16,fontWeight:700}}>{cur.c?cur.c.name:""} — {cur.p.name}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#888"}}>Contract Total</div>
              <div style={{fontSize:22,fontWeight:700}}>{fmt(pTot(cur.p))}</div>
            </div>
          </div>
        </div>
        {cur.p.builds&&cur.p.builds.map((b,i)=>renderWorkOrder(b,i))}
        {/* Combined Payment Summary */}
        {cur.p.builds&&cur.p.builds.length>1&&(()=>{
          const builds=cur.p.builds;
          const prR=pRetail(cur.p),pS=pSold(cur.p);
          const cp=calcCombinedPayments(builds,prR,pS);const signing=cp.signing,start2=cp.start,mid2=cp.mid,final3=cp.final2,hasMid2=cp.hasMid;
          return <div style={{background:"#e8f4ff",color:"#1a1a1a",borderRadius:8,padding:16}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#555",marginBottom:6}}>Combined Payment Schedule</div>
            <div style={{display:"grid",gridTemplateColumns:hasMid2?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",gap:10}}>
              <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Due at Signing</div><div style={{fontSize:18,fontWeight:700}}>{fmt(signing)}</div></div>
              <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Due at Start</div><div style={{fontSize:18,fontWeight:700}}>{fmt(start2)}</div></div>
              {hasMid2&&<div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Due at Midpoint</div><div style={{fontSize:18,fontWeight:700}}>{fmt(mid2)}</div></div>}
              <div><div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Due upon Completion</div><div style={{fontSize:18,fontWeight:700}}>{fmt(final3)}</div></div>
            </div>
          </div>;
        })()}
      </div>
    </div></div>}

    {/* JSON Payload Preview */}
    {preview==="json"&&cur.p&&<div className="mo" onClick={()=>setPreview(null)}><div className="ml" style={{maxWidth:700,padding:0,background:"var(--c1)",border:"1px solid var(--bd)",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid var(--bd)",position:"sticky",top:0,background:"var(--c1)",zIndex:1}}>
        <div style={{fontSize:12,fontWeight:700}}>Webhook Payload Preview</div>
        <div style={{display:"flex",gap:4}}>
          <button className="btn bs bp" onClick={()=>{navigator.clipboard.writeText(JSON.stringify(buildWebhookPayload(),null,2));flash("Copied!")}}><I name="file" size={10}/> Copy JSON</button>
          <button className="btn bs" onClick={()=>setPreview("wo")}>Back</button>
          <button className="btn bs" onClick={()=>setPreview(null)}>Close</button>
        </div>
      </div>
      <pre style={{padding:14,fontSize:10,lineHeight:1.5,color:"var(--tx)",fontFamily:"monospace",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{JSON.stringify(buildWebhookPayload(),null,2)}</pre>
    </div></div>}

    {preview==="con"&&cur.p&&<div className="mo" onClick={()=>setPreview(null)}><div className="ml" style={{maxWidth:760,padding:0,background:"transparent",border:"none",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4,position:"sticky",top:0,zIndex:1}}><button className="btn bs" style={{background:"#fff",color:"#333"}} onClick={()=>setPreview(null)}>Close</button></div>
      <div className="con">
        <h1>Renovation Contract</h1>
        <div style={{color:"#888",marginBottom:18}}>{cur.c?cur.c.name:""} {cur.p.name?"\u00b7 "+cur.p.name:""}</div>
        <h3>Client</h3>
        <p>{cur.c?cur.c.name:""}<br/>{cur.c?cur.c.address:""}<br/>{cur.c?cur.c.email:""} {cur.c&&cur.c.phone?"\u00b7 "+cur.c.phone:""}</p>

        {cur.p.builds&&cur.p.builds.map((b,i)=>{
          const sow = SOW[b.type] || SOW["Full Bathroom Remodel"];
          const dt = bDiscTotal(b);
          return <div key={b.id} style={{marginTop:20,paddingTop:16,borderTop:i>0?"2px solid #ddd":"none"}}>
            <h3>Work Order #{i+1}: {b.name}</h3>
            <p style={{fontSize:10,color:"#666",marginBottom:8}}>{b.type} {b.wizConfig&&b.wizConfig.brand?"\u00b7 "+b.wizConfig.brand:""} {b.wizConfig&&b.wizConfig.size?"\u00b7 "+b.wizConfig.size:""} {b.wizConfig&&b.wizConfig.vanityType?"\u00b7 "+b.wizConfig.vanityType+" Vanity":""} {b.wizConfig&&b.wizConfig.sinkBase?"\u00b7 "+b.wizConfig.sinkBase:""}</p>

            {/* Statement of Work */}
            <div style={{background:"#f8f8f6",padding:14,borderRadius:8,marginBottom:10,border:"1px solid #e8e8e8"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{sow.title}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#2a6e2a",marginBottom:8}}>{sow.guarantee}</div>
              {sow.steps&&<ol style={{paddingLeft:18,marginBottom:8}}>
                {sow.steps.map((s,si)=><li key={si} style={{fontSize:10,lineHeight:1.6,marginBottom:1}}>{s}</li>)}
              </ol>}
              {sow.prepwork&&<>
                <div style={{fontSize:10,fontWeight:600,marginTop:6,marginBottom:4}}>CHARGE ALSO INCLUDES PROPERTY PROTECTION PREPWORK:</div>
                <ol style={{paddingLeft:18,marginBottom:8}}>
                  {sow.prepwork.map((s,si)=><li key={si} style={{fontSize:10,lineHeight:1.6,marginBottom:1}}>{s}</li>)}
                </ol>
              </>}
            </div>

            {/* Disclaimers */}
            <div style={{marginBottom:10}}>
              {sow.disclaimers&&sow.disclaimers.map((d,di)=><p key={di} style={{fontSize:9,color:"#666",fontWeight:600,marginBottom:3}}>(***{d}***)</p>)}
              {sow.tileNote&&<p style={{fontSize:9,color:"#444",fontWeight:700,marginTop:6,padding:6,background:"#fff3cd",borderRadius:4}}>{sow.tileNote}</p>}
            </div>

            {/* Line-by-line order description */}
            {((b.items&&b.items.length>0)||(b.extras&&b.extras.length>0))&&<div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",color:"#888",marginBottom:4}}>Order Details</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
                <thead><tr style={{borderBottom:"1px solid #ddd"}}>
                  <th style={{textAlign:"left",padding:"3px 4px",fontSize:9,color:"#999",fontWeight:600}}>Item</th>
                  <th style={{textAlign:"center",padding:"3px 4px",fontSize:9,color:"#999",fontWeight:600,width:40}}>Qty</th>
                </tr></thead>
                <tbody>
                  {b.items&&b.items.map(l=><tr key={l.id} style={{borderBottom:"1px solid #f0f0f0"}}>
                    <td style={{padding:"4px",verticalAlign:"top"}}>
                      <div style={{fontWeight:500}}>{l.productName||l.stepLabel||"Item"}</div>
                      {l.note&&<div style={{fontSize:9,color:"#888",fontStyle:"italic",marginTop:1}}>Note: {l.note}</div>}
                    </td>
                    <td style={{padding:"4px",textAlign:"center"}}>{l.qty}</td>
                  </tr>)}
                  {b.extras&&b.extras.length>0&&<tr><td colSpan={2} style={{padding:"6px 4px 2px",fontSize:9,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".05em"}}>Additional Work / Extras</td></tr>}
                  {b.extras&&b.extras.map(x=>{const lp=x.linkedProductId?allProducts.find(p=>p.id===x.linkedProductId):null;return <tr key={x.id} style={{borderBottom:"1px solid #f0f0f0"}}>
                    <td style={{padding:"4px",verticalAlign:"top"}}>
                      <div style={{fontWeight:500}}>{x.name}</div>
                      {lp&&<div style={{fontSize:9,color:"#2a6bcc",fontWeight:500}}>→ {lp.name}</div>}
                      {x.note&&<div style={{fontSize:9,color:"#888",fontStyle:"italic",marginTop:1}}>Note: {x.note}</div>}
                    </td>
                    <td style={{padding:"4px",textAlign:"center"}}>{x.qty||1}</td>
                  </tr>})}
                </tbody>
              </table>
            </div>}

            {/* Pricing */}
            <div style={{background:"#f5f5f3",padding:10,borderRadius:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:600}}>Work Order #{i+1} Retail</span>
              <div style={{textAlign:"right"}}>
                <span style={{fontWeight:700,fontSize:14}}>{fmt(bSub(b))}</span>
              </div>
            </div>
          </div>;
        })}


        {/* Total */}
        <div style={{background:"#1a1a1a",color:"#fff",padding:14,borderRadius:8,marginTop:12,display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:700}}>
          <span>Contract Total</span><span>{fmt(pTot(cur.p))}</span>
        </div>

        {/* Payment Terms - per build, combined */}
        {(()=>{
          const builds=cur.p.builds||[];
          const prAmt=pRetail(cur.p),pSoldAmt=pSold(cur.p);
          const {signing,start,mid,final2,hasMid}=calcCombinedPayments(builds,prAmt,pSoldAmt);
          return <>
            <h3>Payment Terms</h3>
            {builds.length>1&&<div style={{marginBottom:8}}>
              {builds.map((b,i)=>{const pt=b.payTerms||{p1:25,p2:25,p3:0,p4:50,useP3:false};const sh=prAmt>0?(bSub(b)/prAmt):0;const bSold=pSoldAmt*sh;return <div key={b.id} style={{fontSize:10,marginBottom:4,padding:6,background:"#f8f8f6",borderRadius:4}}>
                <div style={{fontWeight:600}}>{b.name}</div>
                <span>{fmt(calcPayAmt(pt,"p1",bSold))} at signing</span>
                <span> | {fmt(calcPayAmt(pt,"p2",bSold))} at start</span>
                {pt.useP3&&<span> | {fmt(calcPayAmt(pt,"p3",bSold))} at midpoint</span>}
                <span> | {fmt(calcPayAmt(pt,"p4",bSold))} upon completion</span>
              </div>})}
            </div>}
            <div style={{fontSize:12,marginBottom:4}}>
              <strong>Due at Signing:</strong> {fmt(signing)} | <strong>Due at Start:</strong> {fmt(start)}
              {hasMid&&<> | <strong>Due at Midpoint:</strong> {fmt(mid)}</>}
              {" "}| <strong>Due upon Completion:</strong> {fmt(final2)}
            </div>
            <p>All work shall be completed in a workmanlike manner and in compliance with local building codes.</p>
            <p style={{fontStyle:"italic",fontSize:10,color:"#888"}}>Payment due dates are subject to change based upon material availability and installation scheduling.</p>
          </>;
        })()}

        <div style={{display:"flex",gap:60,marginTop:30}}>
          <div><div className="sig">Client Signature and Date</div></div>
          <div><div className="sig">Company Representative and Date</div></div>
        </div>
      </div>
    </div></div>}

    {/* Purchase Orders Preview - one PO per supplier */}
    {preview==="po"&&cur.p&&<div className="mo" onClick={()=>setPreview(null)}><div className="ml" style={{maxWidth:800,padding:0,background:"transparent",border:"none",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"flex-end",gap:4,marginBottom:4,position:"sticky",top:0,zIndex:1}}>
        <button className="btn bs" style={{background:"#fff",color:"#333"}} onClick={()=>window.print()}>Print / Save PDF</button>
        <button className="btn bs" style={{background:"#fff",color:"#333"}} onClick={()=>setPreview(null)}>Close</button>
      </div>
      <div className="po-print">
      {(()=>{
        const builds = cur.p.builds||[];
        const allItems = [];
        builds.forEach(b => {
          const enriched = enrichBuildItems(b);
          enriched.filter(l=>l.productId!=="BASE"&&l.productId!=="NONE"&&l.productId!=="CUST_SUPPLIED").forEach(l => {
            allItems.push({...l, buildName:b.name, buildType:b.type, itemType:l.itemType||"Product"});
          });
          (b.extras||[]).forEach(x => {
            const prod = allProducts.find(p=>p.id===x.productId);
            allItems.push({
              productId:x.productId, productName:x.name, qty:x.qty||1, price:x.price||0, cost:prod?(prod.cost||0):0,
              sku:prod?(prod.sku||""):"", supplier:prod?mapSupplier(prod.supplier||prod.sup||""):"Other Suppliers",
              itemType:prod?(prod.itemType||"Product"):"Product", note:x.note||"",
              buildName:b.name, buildType:b.type, stepLabel:"Extras",
            });
            // If extra has a linked product, add it as a separate PO line item
            if (x.linkedProductId) {
              const lp = allProducts.find(p=>p.id===x.linkedProductId);
              if (lp) allItems.push({
                productId:lp.id, productName:lp.name+" (for "+x.name+")", qty:x.qty||1, price:lp.price||0, cost:lp.cost||0,
                sku:lp.sku||"", supplier:mapSupplier(lp.supplier||lp.sup||""),
                itemType:lp.itemType||"Product", note:"Linked to: "+x.name,
                buildName:b.name, buildType:b.type, stepLabel:"Extras — Linked Product",
              });
            }
          });
        });

        // Group by supplier
        const bySupplier = {};
        allItems.forEach(item => {
          const sup = item.supplier || "Other Suppliers";
          if (!bySupplier[sup]) bySupplier[sup] = [];
          bySupplier[sup].push(item);
        });
        const suppliers = Object.keys(bySupplier).sort();
        if (suppliers.length === 0) return <div style={{background:"#fff",padding:40,borderRadius:8,textAlign:"center",color:"#888"}}>No items to generate purchase orders for.</div>;

        return suppliers.map((sup, si) => {
          const items = bySupplier[sup];
          const materials = items.filter(x=>x.itemType==="Material");
          const products = items.filter(x=>x.itemType==="Product");
          const totalCost = items.reduce((s,x)=>(s+(x.cost||0)*(x.qty||1)),0);
          const totalPrice = items.reduce((s,x)=>(s+(x.price||0)*(x.qty||1)),0);
          return <div key={sup} className="po-page" style={{background:"#fff",color:"#1a1a1a",borderRadius:8,padding:28,marginBottom:16,fontSize:11,pageBreakAfter:"always"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,paddingBottom:12,borderBottom:"2px solid #1a1a1a"}}>
              <div>
                <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:700}}>Purchase Order</div>
                <div style={{fontSize:10,color:"#666",marginTop:2}}>RenovationsNow</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#888"}}>PO #{si+1} of {suppliers.length}</div>
                <div style={{fontSize:14,fontWeight:700,marginTop:2}}>{sup}</div>
                <div style={{fontSize:9,color:"#888",marginTop:2}}>Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16,fontSize:10}}>
              <div style={{background:"#f8f8f6",padding:10,borderRadius:6}}>
                <div style={{fontWeight:700,marginBottom:4}}>Project</div>
                <div>{cur.p.name}</div>
                <div style={{color:"#666"}}>{cur.c?cur.c.name:""}</div>
                <div style={{color:"#666"}}>{cur.c?cur.c.address:""}</div>
                {cur.p.orderedAt&&<div style={{color:"#666",marginTop:4}}>Ordered: {new Date(cur.p.orderedAt).toLocaleDateString()}</div>}
              </div>
              <div style={{background:"#f8f8f6",padding:10,borderRadius:6}}>
                <div style={{fontWeight:700,marginBottom:4}}>Summary</div>
                <div>Items: {items.length} ({materials.length} materials, {products.length} products)</div>
                <div>Builds: {[...new Set(items.map(x=>x.buildName))].join(", ")}</div>
                <div style={{fontWeight:700,marginTop:4}}>Total Cost: {fmt(totalCost)}</div>
              </div>
            </div>

            {materials.length>0&&<>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#555",marginBottom:6,marginTop:12}}>Materials</div>
              <table style={{fontSize:10}}>
                <thead><tr style={{background:"#f0f0ee"}}>
                  <th style={{padding:"5px 6px",textAlign:"left"}}>Item</th>
                  <th style={{padding:"5px 6px",textAlign:"left",width:70}}>SKU</th>
                  <th style={{padding:"5px 6px",textAlign:"left",width:90}}>Build</th>
                  <th style={{padding:"5px 6px",textAlign:"center",width:35}}>Qty</th>
                  <th style={{padding:"5px 6px",textAlign:"right",width:70}}>Unit Cost</th>
                  <th style={{padding:"5px 6px",textAlign:"right",width:80}}>Total</th>
                </tr></thead>
                <tbody>{materials.map((item,ii)=><tr key={ii}>
                  <td style={{padding:"4px 6px",fontWeight:500}}>{item.productName||item.stepLabel||""}{item.note&&<div style={{fontSize:8,color:"#c55",fontStyle:"italic"}}>Note: {item.note}</div>}</td>
                  <td style={{padding:"4px 6px",color:"#666"}}>{item.sku||""}</td>
                  <td style={{padding:"4px 6px",color:"#666"}}>{item.buildName}</td>
                  <td style={{padding:"4px 6px",textAlign:"center"}}>{item.qty||1}</td>
                  <td style={{padding:"4px 6px",textAlign:"right"}}>{fmt(item.cost||0)}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",fontWeight:600}}>{fmt((item.cost||0)*(item.qty||1))}</td>
                </tr>)}</tbody>
                <tfoot><tr style={{borderTop:"2px solid #1a1a1a"}}>
                  <td colSpan={5} style={{padding:"5px 6px",fontWeight:700}}>Materials Subtotal</td>
                  <td style={{padding:"5px 6px",textAlign:"right",fontWeight:700}}>{fmt(materials.reduce((s,x)=>s+(x.cost||0)*(x.qty||1),0))}</td>
                </tr></tfoot>
              </table>
            </>}

            {products.length>0&&<>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"#555",marginBottom:6,marginTop:16}}>Products</div>
              <table style={{fontSize:10}}>
                <thead><tr style={{background:"#f0f7ff"}}>
                  <th style={{padding:"5px 6px",textAlign:"left"}}>Item</th>
                  <th style={{padding:"5px 6px",textAlign:"left",width:70}}>SKU</th>
                  <th style={{padding:"5px 6px",textAlign:"left",width:90}}>Build</th>
                  <th style={{padding:"5px 6px",textAlign:"center",width:35}}>Qty</th>
                  <th style={{padding:"5px 6px",textAlign:"right",width:70}}>Unit Cost</th>
                  <th style={{padding:"5px 6px",textAlign:"right",width:80}}>Total</th>
                </tr></thead>
                <tbody>{products.map((item,ii)=><tr key={ii}>
                  <td style={{padding:"4px 6px",fontWeight:500}}>{item.productName||item.stepLabel||""}{item.note&&<div style={{fontSize:8,color:"#c55",fontStyle:"italic"}}>Note: {item.note}</div>}</td>
                  <td style={{padding:"4px 6px",color:"#666"}}>{item.sku||""}</td>
                  <td style={{padding:"4px 6px",color:"#666"}}>{item.buildName}</td>
                  <td style={{padding:"4px 6px",textAlign:"center"}}>{item.qty||1}</td>
                  <td style={{padding:"4px 6px",textAlign:"right"}}>{fmt(item.cost||0)}</td>
                  <td style={{padding:"4px 6px",textAlign:"right",fontWeight:600}}>{fmt((item.cost||0)*(item.qty||1))}</td>
                </tr>)}</tbody>
                <tfoot><tr style={{borderTop:"2px solid #1a1a1a"}}>
                  <td colSpan={5} style={{padding:"5px 6px",fontWeight:700}}>Products Subtotal</td>
                  <td style={{padding:"5px 6px",textAlign:"right",fontWeight:700}}>{fmt(products.reduce((s,x)=>s+(x.cost||0)*(x.qty||1),0))}</td>
                </tr></tfoot>
              </table>
            </>}

            <div style={{display:"flex",justifyContent:"space-between",marginTop:16,paddingTop:12,borderTop:"2px solid #1a1a1a",fontSize:13,fontWeight:700}}>
              <span>PO Total — {sup}</span>
              <span>{fmt(totalCost)}</span>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:32}}>
              <div><div style={{borderTop:"1px solid #aaa",paddingTop:4,fontSize:9,color:"#888"}}>Ordered By / Date</div></div>
              <div><div style={{borderTop:"1px solid #aaa",paddingTop:4,fontSize:9,color:"#888"}}>Approved By / Date</div></div>
            </div>
          </div>;
        });
      })()}
      </div>
    </div></div>}
  </>);

  /* ── RENDER ── */
  const closeMob = () => setMobileMenu(false);
  return (<><style>{CSS}</style>
    <div className="app">
      {/* Mobile header bar */}
      <div className="mob-hdr" style={{position:"fixed",top:0,left:0,right:0,height:48,zIndex:80,background:"var(--c1)",borderBottom:"1px solid var(--bd)",alignItems:"center",justifyContent:"space-between",padding:"0 12px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button className="bg2" onClick={()=>setMobileMenu(!mobileMenu)} style={{padding:5}}><I name="menu" size={20}/></button>
          <div className="sb-logo" style={{fontSize:16}}>Remodel<span>Pro</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:9,color:"var(--t2)"}}>{profile?.full_name||""}</span>
          {onSignOut&&<button className="btn bs" onClick={onSignOut} style={{color:"var(--er)",borderColor:"var(--er)",fontSize:9,padding:"3px 8px"}}>Sign Out</button>}
        </div>
      </div>
      {/* Mobile sidebar overlay */}
      <div className={"mob-ov"+(mobileMenu?" open":"")} onClick={closeMob}/>
      {/* Mobile bottom nav */}
      <div className="mob-bn" style={{position:"fixed",bottom:0,left:0,right:0,height:56,zIndex:80,background:"var(--c1)",borderTop:"1px solid var(--bd)",alignItems:"center",justifyContent:"space-evenly",padding:"4px 0 2px"}}>
        <div onClick={()=>{setView("projects");setABuild(null);closeMob()}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,background:view==="projects"?"var(--ad)":"transparent",color:view==="projects"?"var(--a2)":"var(--t2)",minWidth:44}}>
          <I name="users" size={18}/><span style={{fontSize:7,fontWeight:600}}>Customers</span></div>
        {isAdmin&&<div onClick={()=>{setView("pricebook");setPbCat(null);setPbSub(null);setPbSearch("");closeMob()}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,background:view==="pricebook"?"var(--ad)":"transparent",color:view==="pricebook"?"var(--a2)":"var(--t2)",minWidth:44}}>
          <I name="package" size={18}/><span style={{fontSize:7,fontWeight:600}}>Pricebook</span></div>}
        {view==="projects"&&aProj&&cur.p?<>
          <div onClick={()=>setPreview("con")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,color:"var(--gd)",minWidth:36}}>
            <I name="file" size={16}/><span style={{fontSize:6,fontWeight:600}}>Contract</span></div>
          {!cur.p.locked&&<div onClick={()=>{if(confirm("Click to confirm processing the order")){sendToGHL("Approved Order")}}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,background:"var(--ac)",color:"#fff",minWidth:36,opacity:sending?.5:1}}>
            <I name="checkCircle" size={16}/><span style={{fontSize:6,fontWeight:700}}>{sending?"...":"Approve"}</span></div>}
          {!cur.p.locked&&<div onClick={()=>setActionModal("noDemo")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,color:"var(--er)",minWidth:36}}>
            <I name="x" size={16}/><span style={{fontSize:6,fontWeight:600}}>No Demo</span></div>}
          {!cur.p.locked&&<div onClick={()=>setActionModal("pitchMiss")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,color:"var(--wn)",minWidth:36}}>
            <I name="alertTri" size={16}/><span style={{fontSize:6,fontWeight:600}}>Miss</span></div>}
          <div onClick={()=>{setChangeOrder({buildId:"",items:[],chargeable:true});setActionModal("changeOrder")}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,color:"var(--ok)",minWidth:36}}>
            <I name="checkCircle" size={16}/><span style={{fontSize:6,fontWeight:600}}>Change</span></div>
        </>:isAdmin?<div onClick={()=>{setView("ghl");closeMob()}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"2px 6px",borderRadius:6,background:view==="ghl"?"var(--ad)":"transparent",color:view==="ghl"?"var(--a2)":"var(--t2)",minWidth:44}}>
          <I name="zap" size={18}/><span style={{fontSize:7,fontWeight:600}}>Settings</span></div>:null}
      </div>
      <div className={"sb"+(mobileMenu?" open":"")}><div className="sb-h"><div className="sb-logo">Remodel<span>Pro</span></div><div className="sb-sub">{profile?.full_name||user?.email||"Pricebook & Estimating"} <span style={{opacity:.3}}>v3.0</span></div></div>
        <div className="sb-n">
          <div className="sb-s"><div className="sb-l">Workspace</div>
            <div className={"ni"+(view==="projects"?" a":"")} onClick={()=>{setView("projects");setABuild(null);closeMob()}}><I name="users" size={13}/> Customers <span className="bg">{customers.length}</span></div>
            {isAdmin&&<div className={"ni"+(view==="pricebook"?" a":"")} onClick={()=>{setView("pricebook");setPbCat(null);setPbSub(null);setPbSearch("");closeMob()}}><I name="package" size={13}/> Pricebook <span className="bg">{allProducts.length}</span></div>}</div>
          {isAdmin&&<div className="sb-s"><div className="sb-l">Admin</div>
            <div className={"ni"+(view==="ghl"?" a":"")} onClick={()=>{setView("ghl");closeMob()}}><I name="zap" size={13}/> Integrations {ghl.webhookUrl&&<span className="bg" style={{background:"var(--od)",color:"var(--ok)"}}>ON</span>}</div>
            <div className={"ni"+(view==="admin"?" a":"")} onClick={()=>{setView("admin");closeMob()}}><I name="file" size={13}/> Admin</div>
            <div className={"ni"+(view==="reports"?" a":"")} onClick={()=>{setView("reports");closeMob()}}><I name="zap" size={13}/> Reports</div></div>}
          {onSignOut&&<div className="sb-s"><div className="ni" onClick={onSignOut} style={{color:"var(--er)"}}><I name="x" size={13}/> Sign Out</div></div>}
          {customers.length>0&&<div className="sb-s"><div className="sb-l">Recent</div>
            {customers.slice(0,5).map(c=><div key={c.id} className={"ni"+(aCust===c.id&&view==="projects"?" a":"")} onClick={()=>{setView("projects");setACust(c.id);setAProj(null);setABuild(null);closeMob()}}><I name="home" size={11}/><span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span></div>)}</div>}
        </div></div>
      <div className="mn">
        {view==="pricebook"&&renderPB()}
        {view==="projects"&&renderProj()}
        {view==="wizard"&&renderWiz()}
        {view==="ghl"&&renderGHL()}
        {view==="admin"&&renderAdmin()}
        {view==="reports"&&renderReports()}
      </div>
    </div>
    {modal==="cust"&&<div className="mo" onClick={()=>setModal(null)}><div className="ml" onClick={e=>e.stopPropagation()}>
      <div className="mlt">New Customer</div>
      <div className="ig"><label>Name</label><input className="inp" value={fd.name||""} onChange={e=>setFd({...fd,name:e.target.value})}/></div>
      <div className="g2"><div className="ig"><label>Email</label><input className="inp" value={fd.email||""} onChange={e=>setFd({...fd,email:e.target.value})}/></div>
        <div className="ig"><label>Phone</label><input className="inp" value={fd.phone||""} onChange={e=>setFd({...fd,phone:e.target.value})}/></div></div>
      <div className="ig"><label>Address</label><input className="inp" value={fd.address||""} onChange={e=>setFd({...fd,address:e.target.value})}/></div>
      <div style={{display:"flex",gap:4,justifyContent:"flex-end",marginTop:4}}><button className="btn" onClick={()=>setModal(null)}>Cancel</button>
        <button className="btn bp" style={{opacity:fd.name?1:.4}} onClick={()=>{if(fd.name)createCust()}}>Create</button></div></div></div>}
    {modal==="proj"&&<div className="mo" onClick={()=>setModal(null)}><div className="ml" onClick={e=>e.stopPropagation()}>
      <div className="mlt">New Project</div>
      <div className="ig"><label>Name</label><input className="inp" placeholder="e.g. Full Home Remodel" value={fd.name||""} onChange={e=>setFd({...fd,name:e.target.value})} autoFocus/></div>
      <div style={{display:"flex",gap:4,justifyContent:"flex-end",marginTop:4}}><button className="btn" onClick={()=>setModal(null)}>Cancel</button>
        <button className="btn bp" style={{opacity:fd.name?1:.4}} onClick={()=>{if(fd.name)createProj()}}>Create</button></div></div></div>}
    {modal==="build"&&<div className="mo" onClick={()=>setModal(null)}><div className="ml" onClick={e=>e.stopPropagation()}>
      <div className="mlt">New Build (Work Order)</div>
      <div className="ig"><label>Build Name</label><input className="inp" placeholder="e.g. Master Bathroom" value={fd.name||""} onChange={e=>setFd({...fd,name:e.target.value})} autoFocus/></div>
      <div className="ig"><label>Build Type</label><select className="inp" value={fd.type||"Full Bathroom Remodel"} onChange={e=>setFd({...fd,type:e.target.value})}>
        <option>Full Bathroom Remodel</option><option>Wet Area Only</option><option>Half Bath</option><option>Kitchen Remodel</option><option>Roofing</option></select></div>
      <div style={{display:"flex",gap:4,justifyContent:"flex-end",marginTop:8}}>
        <button className="btn" onClick={()=>setModal(null)}>Cancel</button>
        <button className="btn bp" style={{opacity:fd.name?1:.4,padding:"7px 16px"}} onClick={()=>{if(fd.name)createBuild()}}>Create & Configure</button>
      </div></div></div>}
    {toast&&<div style={{position:"fixed",bottom:16,right:16,zIndex:200,background:toast.t==="er"?"var(--er)":"var(--ok)",color:toast.t==="er"?"#fff":"#0B0D10",padding:"8px 14px",borderRadius:"var(--r)",fontWeight:600,fontSize:11,boxShadow:"0 4px 16px rgba(0,0,0,.4)"}}>{toast.m}</div>}
  </>);
}
