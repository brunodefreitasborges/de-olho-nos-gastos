import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'socialIcon'
})
export class SocialIconPipe implements PipeTransform {
  private socialIcons = {
    facebook: 'assets/facebook.png',
    twitter: 'assets/twitter.png',
    instagram: 'assets/instagram.png',
    youtube: 'assets/youtube.png',
  };


  transform(value: string, ...args: unknown[]): any {
    
    if(value.toLowerCase().includes('twitter')) {
      const iconUrl = this.socialIcons['twitter'];
      const iconHtml = `<a target="_blank" href="${value}"><img src="${iconUrl}" alt="${value}" width="28" /></a>`;
      return iconHtml;
    } else if (value.toLowerCase().includes('facebook')) {
      const iconUrl = this.socialIcons['facebook'];
      const iconHtml = `<a target="_blank" href="${value}"><img src="${iconUrl}" alt="${value}" width="28" /></a>`;
      return iconHtml;
    } else if (value.toLowerCase().includes('instagram')) {
      const iconUrl = this.socialIcons['instagram'];
      const iconHtml = `<a target="_blank" href="${value}"><img src="${iconUrl}" alt="${value}" width="28" /></a>`;
      return iconHtml;
    } else if (value.toLowerCase().includes('youtube')) {
      const iconUrl = this.socialIcons['youtube'];
      const iconHtml = `<a target="_blank" href="${value}"><img src="${iconUrl}" alt="${value}" width="28" /></a>`;
      return iconHtml;
    }

    return value;
  }

}
