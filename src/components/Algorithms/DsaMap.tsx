import { useState } from 'react';

type DsaTopic = {
  name: string;
  concepts: string[];
};

const topics: DsaTopic[] = [
  { name: 'Basics', concepts: ['Time Complexity', 'Space Complexity', 'Recursion Basics', 'Hashing'] },
  { name: 'Arrays', concepts: ['Kadane\'s', 'Two Pointers', 'Dutch National Flag', 'Prefix Sum'] },
  { name: 'Strings', concepts: ['String Matching', 'KMP', 'Rabin-Karp', 'Palindromes'] },
  { name: 'Sorting', concepts: ['Merge Sort', 'Quick Sort', 'Counting Sort', 'Comparators'] },
  { name: 'Binary Search', concepts: ['Search Space', 'Lower/Upper Bound', 'Answer-Space BS', 'Rotated Arrays'] },
  { name: 'Linked Lists', concepts: ['Reversal', 'Fast/Slow Pointer', 'Merge', 'Cycle Detection'] },
  { name: 'Recursion', concepts: ['Backtracking', 'Subsets', 'Permutations', 'N-Queens'] },
  { name: 'Stack / Queue', concepts: ['Monotonic Stack', 'Next Greater', 'LRU Cache', 'Sliding Window'] },
  { name: 'Trees', concepts: ['Traversals', 'Height/Diameter', 'LCA', 'Morris Traversal'] },
  { name: 'BST', concepts: ['Validation', 'Floor/Ceil', 'Kth Smallest', 'Iterator'] },
  { name: 'Heaps', concepts: ['Min/Max Heap', 'Top K', 'Median Stream', 'Merge K Lists'] },
  { name: 'Greedy', concepts: ['Activity Selection', 'Intervals', 'Job Sequencing', 'Huffman'] },
  { name: 'Graphs', concepts: ['BFS/DFS', 'Dijkstra', 'Topo Sort', 'Union-Find', 'MST'] },
  { name: 'Dynamic Programming', concepts: ['1D DP', '2D DP', 'Subsequence', 'Knapsack', 'MCM', 'DP on Trees'] },
  { name: 'Tries', concepts: ['Insert/Search', 'Prefix Count', 'XOR Trie', 'Auto-complete'] },
  { name: 'Bit Manipulation', concepts: ['XOR Tricks', 'Subsets via Bitmask', 'Power of 2', 'Counting Bits'] },
];

const DsaMap = () => {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const hoveredData = topics.find(t => t.name === hoveredTopic);

  return (
    <div className="bg-[#0c0c0c] border border-[#27272a] p-8 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-sans text-small text-white mb-1">DSA KNOWLEDGE GRAPH</h3>
          <p className="font-mono text-[10px] text-dim">Foundation built through Striver's A2Z, Love Babbar, and LeetCode.</p>
        </div>
        <div className="font-mono text-[10px] text-accent">
          {topics.length} TOPIC AREAS
        </div>
      </div>
      
      {/* Topic Grid */}
      <div className="flex-1 flex flex-wrap content-start gap-2">
        {topics.map(topic => (
          <div 
            key={topic.name}
            onMouseEnter={() => setHoveredTopic(topic.name)}
            onMouseLeave={() => setHoveredTopic(null)}
            className={`cursor-default px-4 py-2 border font-mono text-tiny transition-all duration-300 ${
              hoveredTopic === topic.name 
                ? 'border-accent bg-accent/10 text-white scale-105' 
                : hoveredTopic 
                  ? 'border-[#1a1a1a] text-[#3f3f46] opacity-40'
                  : 'border-[#27272a] text-muted hover:border-[#3f3f46]'
            }`}
          >
            {topic.name}
          </div>
        ))}
      </div>

      {/* Concept Detail Panel */}
      <div className="mt-6 border-t border-[#27272a] pt-4 min-h-[80px]">
        {hoveredData ? (
          <div>
            <div className="font-mono text-[10px] text-accent mb-3">{hoveredData.name.toUpperCase()} — CONCEPTS</div>
            <div className="flex flex-wrap gap-2">
              {hoveredData.concepts.map(c => (
                <span key={c} className="font-mono text-[10px] text-white bg-[#111] border border-accent/30 px-2 py-1">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-mono text-[10px] text-dim italic">
            Hover a topic to see concepts.
          </div>
        )}
      </div>
      
      {/* Source Links */}
      <div className="mt-6 border-t border-[#27272a] pt-4 flex gap-8 flex-wrap">
        <div>
          <div className="font-mono text-[10px] text-muted mb-1">PRIMARY RESOURCE</div>
          <a href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z" target="_blank" rel="noopener noreferrer" className="font-sans text-small text-white hover:text-accent transition-colors">
            Striver's A2Z DSA ↗
          </a>
        </div>
        <div>
          <div className="font-mono text-[10px] text-muted mb-1">C++ FOUNDATION</div>
          <a href="https://www.youtube.com/watch?v=Z2oxGj36vZk" target="_blank" rel="noopener noreferrer" className="font-sans text-small text-white hover:text-accent transition-colors">
            Love Babbar C++ ↗
          </a>
        </div>
        <div>
          <div className="font-mono text-[10px] text-muted mb-1">PRACTICE</div>
          <a href="https://leetcode.com/u/anunaynaman/" target="_blank" rel="noopener noreferrer" className="font-sans text-small text-white hover:text-accent transition-colors">
            LeetCode ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default DsaMap;
