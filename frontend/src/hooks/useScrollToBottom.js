import { useEffect, useRef } from 'react';

/**
 * Custom hook that auto-scrolls a container to its bottom
 * whenever the `dependencies` change.
 *
 * @param {Array} dependencies - values to watch (e.g. [messages])
 * @returns {React.RefObject} - attach to the scroll container's bottom sentinel element
 */
export default function useScrollToBottom(dependencies = []) {
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return bottomRef;
}
