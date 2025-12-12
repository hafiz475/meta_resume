// src/components/Shared/LottieFallback.jsx
import React from "react";
import { Player } from "lottie-react";

/**
 * LottieFallback - simple wrapper around lottie-react
 * Props:
 *  - src (string path to JSON)
 *  - style
 */
export default function LottieFallback({ src, style = {}, loop = true, autoplay = true }) {
    if (!src) return null;
    try {
        return <Player src={src} loop={loop} autoplay={autoplay} style={style} />;
    } catch (e) {
        // fallback: simple empty box
        return <div style={{ width: style.width || 64, height: style.height || 64 }} />;
    }
}
