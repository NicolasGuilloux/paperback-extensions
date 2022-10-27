import {
    ContentRating,
    LanguageCode,
    SourceInfo,
    TagType,
    SearchRequest
} from 'paperback-extensions-common'

import {
    getExportVersion,
    Madara
} from '../lib/TheNetsky/extensions-generic/src/Madara'

import {MangaOriginesParser} from "./MangaOriginesParser";

const DOMAIN = 'https://mangas-origines.fr'

export const MangaOriginesInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'Manga Origines',
    description: `Extension that pulls manga from ${DOMAIN}`,
    author: 'Nover',
    authorWebsite: 'https://github.com/NicolasGuilloux',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class MangaOrigines extends Madara {
    baseUrl: string = DOMAIN;
    languageCode: LanguageCode = LanguageCode.FRENCH;
    override readonly parser: MangaOriginesParser = new MangaOriginesParser();

    override hasAdvancedSearchPage = true
    override alternativeChapterAjaxEndpoint = true

}
