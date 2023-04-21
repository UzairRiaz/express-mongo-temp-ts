import { Schema } from "mongoose";

const paginate = (schema: Schema) => {
    schema.statics.paginate = async function (filter: any, options: any) {
        let sort = options.sort || '';
        if (options.sortBy) {
            const sortingCriteria: String[] = [];
            options.sortBy.split(',').forEach((sortOption: String) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            sort = sortingCriteria.join(' ');
        } else {
            sort = 'createdAt';
        }
        let limit: number = parseInt(options.limit) || 10;
        let page: number = parseInt(options.page) || 1;
        const skip: number = (page - 1) * limit;
        const select: string = options.select || '';

        const countPromise = this.countDocuments(filter).exec();
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).select(select).exec();

        if (options.populate) {
            options.populate.split(',').forEach((populateOption: any) => {
                docsPromise = docsPromise.populate(
                    populateOption
                        .split('.')
                        .reverse()
                        .reduce((a: any, b: any) => ({ path: b, populate: a }))
                );
            });
        }
        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages: number = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return Promise.resolve(result);
        });
    };
};

export {
    paginate,
};
