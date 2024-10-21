import { Injectable } from '@angular/core';
import Hls from "hls.js";

@Injectable({
  providedIn: 'root'
})
export class VideoDownloadService {

  async downloadVideo(url: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch playlist:', response.statusText);
      return;
    }

    const playlist = await response.text();
    const segmentUrls = this.parsePlaylist(playlist, url);

    const segments = await Promise.all(segmentUrls.map(this.downloadSegment));

    const blob = new Blob(segments, { type: 'video/mp2t' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'video.mp4'; // Specify a file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }

  private parsePlaylist(playlist: string, baseUrl: string): string[] {
    const segmentUrls: string[] = [];
    const lines = playlist.split('\n');

    for (const line of lines) {
      if (line && !line.startsWith('#')) {
        const segmentUrl = new URL(line, baseUrl).href;
        segmentUrls.push(segmentUrl);
      }
    }

    return segmentUrls;
  }

  private async downloadSegment(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch segment:', response.statusText);
      return new Blob(); // Return an empty Blob on error
    }
    return await response.blob();
  }
}
