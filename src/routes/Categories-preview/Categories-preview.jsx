import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/Category-preview/Category-preview';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/Spinner/Spinner';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>

            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )}
        </Fragment>
    );
};

export default CategoriesPreview;