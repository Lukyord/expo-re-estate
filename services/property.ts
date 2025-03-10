import { Query } from "react-native-appwrite";
import { config, databases } from "./appwrite";

export const propertyService = {
    async getLatestProperties() {
        try {
            const result = await databases.listDocuments(config.databaseId, config.propertiesCollectionId, [
                Query.orderAsc("$createdAt"),
                Query.limit(5),
            ]);

            return result.documents;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    async getProperties({ filter, query, limit }: { filter: string; query: string; limit?: number }) {
        try {
            const buildQuery = [Query.orderAsc("$createdAt")];

            if (filter && filter !== "All") {
                buildQuery.push(Query.equal(`type`, filter));
            }

            if (query) {
                buildQuery.push(
                    Query.or([
                        Query.search("name", query),
                        Query.search("description", query),
                        Query.search("type", query),
                    ])
                );
            }

            if (limit) {
                buildQuery.push(Query.limit(limit));
            }

            const result = await databases.listDocuments(config.databaseId, config.propertiesCollectionId, buildQuery);

            return result.documents;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    async getPropertyById({ id }: { id: string }) {
        try {
            const result = await databases.getDocument(config.databaseId, config.propertiesCollectionId, id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
