'use client';

import { useRouter } from 'next/navigation';

export default function CategoryFilter({
    categories,
    selectedCategory,
}: {
    categories: any[];
    selectedCategory: string;
}) {
    const router = useRouter();

    const handleChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const category = event.target.value;

        if (category) {
            router.push(
                `/blog?category=${encodeURIComponent(category)}`
            );
        } else {
            router.push('/blog');
        }
    };

    return (
        <select
            className="category-select"
            value={selectedCategory}
            onChange={handleChange}
        >
            <option value="">
                Any Category
            </option>

            {categories.map((category) => (
                <option
                    key={category._id}
                    value={category.title}
                >
                    {category.title}
                </option>
            ))}
        </select>
    );
}