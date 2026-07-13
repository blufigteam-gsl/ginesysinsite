import "./videoHero.css";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import Button from "./Button";

type VideoHeroProps = {
    heading?: {
        text?: string;
        color?: string;
        tag?: string;
    };

    subHeading?: {
        text?: string;
        color?: string;
        opacity?: number;
    };

    description?: {
        text?: string;
        color?: string;
        opacity?: number;
    };

    primaryButton?: {
        text?: string;
        link?: string;
        openInNewTab?: boolean;
    };

    secondaryButton?: {
        text?: string;
        link?: string;
        openInNewTab?: boolean;
    };

    videoType?: string;
    videoUrl?: string;
    uploadedVideo?: any;
    autoplay?: boolean;
    muteVideo?: boolean;
    loopVideo?: boolean;
    posterImage?: any;

    overlayColor?: string;
    overlayOpacity?: number;

    paddingTop?: number;
    paddingBottom?: number;

    contentAlignment?: string;
    layoutType?: "fullWidth" | "contained";
    innerPaddingTop?: number;
    innerPaddingBottom?: number;
};

function getFileUrl(uploadedVideo: any) {
    if (!uploadedVideo) return "";
    if (uploadedVideo.asset?.url) return uploadedVideo.asset.url;
    const ref = uploadedVideo.asset?._ref || uploadedVideo._ref;
    if (!ref) return "";
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    if (!projectId || !dataset) return "";
    const parts = ref.split('-');
    if (parts.length < 3) return "";
    const fileId = parts[1];
    const extension = parts[2];
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
}

function getYouTubeEmbedUrl(url: string, autoplay = true, mute = true, loop = true) {
    if (!url) return "";
    let videoId = "";
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|geops\.youtube\.com\/watch\?v=)([^&\s]+)/);
    if (watchMatch) {
        videoId = watchMatch[1];
    } else {
        const shortMatch = url.match(/youtu\.be\/([^?\s]+)/);
        if (shortMatch) {
            videoId = shortMatch[1];
        } else {
            const embedMatch = url.match(/youtube\.com\/embed\/([^?\s]+)/);
            if (embedMatch) {
                videoId = embedMatch[1];
            }
        }
    }
    if (!videoId) return url;
    const params = new URLSearchParams();
    if (autoplay) params.append("autoplay", "1");
    if (mute) params.append("mute", "1");
    if (loop) {
        params.append("loop", "1");
        params.append("playlist", videoId);
    }
    params.append("rel", "0");
    params.append("playsinline", "1");
    params.append("controls", "0");
    params.append("showinfo", "0");
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function getVimeoEmbedUrl(url: string, autoplay = true, mute = true, loop = true) {
    if (!url) return "";
    let videoId = "";
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([^?\s]+)/);
    if (match) {
        videoId = match[1];
    }
    if (!videoId) return url;
    const params = new URLSearchParams();
    if (autoplay) params.append("autoplay", "1");
    if (mute) params.append("muted", "1");
    if (loop) params.append("loop", "1");
    params.append("background", "1");
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

export default function VideoHero({
    heading,
    subHeading,
    description,
    primaryButton,
    secondaryButton,
    videoType = "youtube",
    videoUrl,
    uploadedVideo,
    autoplay = true,
    muteVideo = true,
    loopVideo = true,
    posterImage,
    overlayColor,
    overlayOpacity,
    paddingTop,
    paddingBottom,
    contentAlignment,
    layoutType = "fullWidth",
    innerPaddingTop,
    innerPaddingBottom,
}: VideoHeroProps) {

    const HeadingTag: any = heading?.tag || "h1";
    const alignment = contentAlignment || "center";
    const isContained = layoutType === "contained";

    // Auto-detect type if uploadedVideo exists but no videoUrl is provided, or if type was not set correctly
    const activeVideoType = (uploadedVideo && !videoUrl) ? "uploaded" : videoType;

    const shouldAutoplay = autoplay !== false;
    const shouldMute = muteVideo !== false;
    const shouldLoop = loopVideo !== false;

    const resolvedVideoUrl = activeVideoType === "youtube"
        ? getYouTubeEmbedUrl(videoUrl || "", shouldAutoplay, shouldMute, shouldLoop)
        : activeVideoType === "vimeo"
        ? getVimeoEmbedUrl(videoUrl || "", shouldAutoplay, shouldMute, shouldLoop)
        : getFileUrl(uploadedVideo);

    const resolvedPoster = posterImage ? urlFor(posterImage).url() : "";

    const padTop = paddingTop !== undefined ? `${paddingTop}px` : "150px";
    const padBottom = paddingBottom !== undefined ? `${paddingBottom}px` : "150px";
    const innerPadTop = innerPaddingTop !== undefined ? `${innerPaddingTop}px` : "80px";
    const innerPadBottom = innerPaddingBottom !== undefined ? `${innerPaddingBottom}px` : "80px";

    const renderInner = () => (
        <>
            {activeVideoType === "uploaded" && resolvedVideoUrl && (
                <video
                    className="video-bg"
                    src={resolvedVideoUrl}
                    autoPlay={shouldAutoplay}
                    muted={shouldMute}
                    loop={shouldLoop}
                    playsInline
                    poster={resolvedPoster}
                />
            )}

            {(activeVideoType === "youtube" || activeVideoType === "vimeo") && resolvedVideoUrl && (
                <iframe
                    className="video-bg"
                    src={resolvedVideoUrl}
                    allow="autoplay; fullscreen"
                />
            )}

            <div
                className="video-overlay"
                style={{
                    backgroundColor:
                        overlayColor || "#000000",

                    opacity:
                        (overlayOpacity || 50) / 100,
                }}
            />

            <div
                className="video-content"
                style={{
                    textAlign: alignment as any,
                }}
            >

                {subHeading?.text && (
                    <div
                        className="video-subtitle"
                        style={{
                            color: subHeading.color,
                            opacity:
                                (subHeading.opacity || 100) / 100,
                        }}
                    >
                        {subHeading.text}
                    </div>
                )}

                {heading?.text && (
                    <HeadingTag
                        className="video-title"
                        style={{
                            color:
                                heading.color || "#ffffff",
                        }}
                    >
                        {heading.text}
                    </HeadingTag>
                )}

                {description?.text && (
                    <div
                        className="video-description"
                        style={{
                            color:
                                description.color || "#ffffff",

                            opacity:
                                (description.opacity || 100) / 100,
                        }}
                    >
                        {description.text}
                    </div>
                )}

                <div className="video-buttons">

                    <Button button={primaryButton} fallbackType="primary" className="hero-btn-primary" />
                    <Button button={secondaryButton} fallbackType="secondary" className="hero-btn-secondary" />

                </div>

            </div>
        </>
    );

    return (
        <section
            className={`video-hero ${isContained ? "is-contained" : ""}`}
            style={{
                paddingTop: padTop,
                paddingBottom: padBottom,
            }}
        >
            {isContained ? (
                <div 
                    className="video-hero-container is-contained"
                    style={{
                        paddingTop: innerPadTop,
                        paddingBottom: innerPadBottom,
                    }}
                >
                    {renderInner()}
                </div>
            ) : renderInner()}
        </section>
    );
}