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

    override sourceTraversalPathName = 'catalogues';
    override hasAdvancedSearchPage = true
    override searchPagePathName = '';
    override alternativeChapterAjaxEndpoint = true

    override constructSearchRequest(page: number, query: SearchRequest): any {
        const data = {
            "action": "madara_load_more",
            "page": (page - 1).toString(),
            "template": "madara-core/content/content-search",
            "vars[s]": (query?.title ?? '').replace(' ', '+'),
            "vars[orderby]": "",
            "vars[paged]": "1",
            "vars[template]": "search",
            "vars[meta_query][0][s]": "Test",
            "vars[meta_query][0][orderby]": "",
            "vars[meta_query][0][paged]": "1",
            "vars[meta_query][0][template]": "search",
            "vars[meta_query][0][meta_query][relation]": "AND",
            "vars[meta_query][0][tax_query][0][taxonomy]": "wp-manga-genre",
            "vars[meta_query][0][tax_query][0][field]": "term_id",
            "vars[meta_query][0][tax_query][0][terms][]": "2",
            "vars[meta_query][0][tax_query][relation]": "OR",
            "vars[meta_query][0][post_type]": "wp-manga",
            "vars[meta_query][0][post_status]": "publish",
            "vars[meta_query][relation]": "AND",
            "vars[tax_query][0][taxonomy]": "wp-manga-genre",
            "vars[tax_query][0][field]": "term_id",
            "vars[tax_query][0][terms][]": "2",
            "vars[tax_query][relation]": "OR",
            "vars[post_type]": "wp-manga",
            "vars[post_status]": "publish",
            "vars[manga_archives_item_layout]": "default"
        };

        return createRequestObject({
            url: `${this.baseUrl}/wp-admin/admin-ajax.php`,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: Object
                .keys(data)
                .map(value => `${value}=${encodeURIComponent(data[value as keyof typeof data])}`)
                .join('&')
        })
    }
}
