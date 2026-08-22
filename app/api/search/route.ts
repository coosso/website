import { createSearchAPI } from 'fumadocs-core/search/server'
import { buildSearchIndexes } from '@/lib/search'

export const { GET } = createSearchAPI('advanced', { indexes: buildSearchIndexes });
