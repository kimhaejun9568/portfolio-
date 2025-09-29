#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 현재 날짜를 YYYY-MM-DD 형식으로 반환
function getCurrentDate() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// 문자열을 슬러그로 변환
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9가-힣 -]/g, '') // 특수문자 제거 (한글 포함)
    .replace(/\s+/g, '-') // 공백을 -로 변경
    .replace(/-+/g, '-') // 연속된 -를 하나로
    .trim()
}

// 사용자 입력 받기
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

// MDX 템플릿 생성
function createMDXTemplate({ title, description, tags, draft = false }) {
  return `---
title: "${title}"
date: "${getCurrentDate()}"
description: "${description}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
cover: "/images/posts/placeholder.jpg"
draft: ${draft}
---

# ${title}

여기에 글 내용을 작성하세요.

## 섹션 예시

이것은 예시 섹션입니다.

### 코드 예시

\`\`\`javascript
const hello = () => {
  console.log('Hello, World!')
}
\`\`\`

### 목록 예시

- 항목 1
- 항목 2
- 항목 3

### 콜아웃 예시

<Note>
이것은 노트 콜아웃입니다.
</Note>

<Warning>
이것은 경고 콜아웃입니다.
</Warning>

## 마무리

글을 마무리하는 내용을 작성하세요.
`
}

async function main() {
  console.log('🚀 새 블로그 글 생성 도구')
  console.log('='=40)

  try {
    // 사용자 입력 받기
    const title = await askQuestion('글 제목을 입력하세요: ')
    if (!title.trim()) {
      console.error('❌ 제목은 필수입니다.')
      process.exit(1)
    }

    const description = await askQuestion('글 설명을 입력하세요: ')
    if (!description.trim()) {
      console.error('❌ 설명은 필수입니다.')
      process.exit(1)
    }

    const tags = await askQuestion('태그를 입력하세요 (쉼표로 구분): ')
    if (!tags.trim()) {
      console.error('❌ 최소 하나의 태그는 필요합니다.')
      process.exit(1)
    }

    const isDraft = await askQuestion('초안으로 저장하시겠습니까? (y/N): ')
    const draft = isDraft.toLowerCase() === 'y' || isDraft.toLowerCase() === 'yes'

    // 슬러그 생성
    const slug = slugify(title)
    const filename = `${slug}.mdx`
    const filepath = path.join(__dirname, '..', 'content', 'posts', filename)

    // 파일 존재 여부 확인
    if (fs.existsSync(filepath)) {
      console.error(`❌ "${filename}" 파일이 이미 존재합니다.`)
      process.exit(1)
    }

    // MDX 콘텐츠 생성
    const content = createMDXTemplate({
      title,
      description,
      tags,
      draft
    })

    // 파일 저장
    fs.writeFileSync(filepath, content, 'utf8')

    console.log('✅ 새 블로그 글이 생성되었습니다!')
    console.log(`📄 파일: ${filename}`)
    console.log(`📁 경로: ${filepath}`)
    console.log(`🏷️  슬러그: ${slug}`)
    console.log(`📝 초안: ${draft ? '예' : '아니오'}`)
    
    if (draft) {
      console.log('\n💡 초안은 프로덕션 빌드에서 제외됩니다.')
    }

    console.log('\n🎉 이제 에디터에서 파일을 열고 글을 작성해보세요!')

  } catch (error) {
    console.error('❌ 오류가 발생했습니다:', error.message)
    process.exit(1)
  }
}

main()
