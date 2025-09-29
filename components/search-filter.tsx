'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface SearchFilterProps {
  tags: string[]
  currentTag?: string
  currentSearch?: string
}

export function SearchFilter({ tags, currentTag, currentSearch }: SearchFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentSearch || '')

  useEffect(() => {
    setSearch(currentSearch || '')
  }, [currentSearch])

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    
    router.push(`/blog?${params.toString()}`)
  }

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (currentTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    
    router.push(`/blog?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    router.push('/blog')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(search)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="글 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cn(
            'w-full rounded-md border border-input bg-background pl-9 pr-12 py-2',
            'text-sm placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        />
        {search && (
          <button
            onClick={() => {
              setSearch('')
              handleSearch('')
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => handleSearch(search)}
          size="sm"
          disabled={!search}
        >
          검색
        </Button>
        {(currentSearch || currentTag) && (
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
          >
            필터 초기화
          </Button>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">태그</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={currentTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTagClick(tag)}
                className="h-7 px-2.5 text-xs"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
