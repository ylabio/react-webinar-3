import { memo } from "react";

function CategoryItem({ item }) {

    console.log(item)

    return (
        <>
            <option className='Select' key={item.value} value={item._id}>
                {item.nesting > 1 ? '- '.repeat(item.nesting - 1) : ''} {item.title}
            </option>
            {item.children &&
                item.children.map((childItem) => {
                    return <CategoryItem item={childItem} key={childItem._id} />;
                })}
        </>
    )
}

export default memo(CategoryItem);