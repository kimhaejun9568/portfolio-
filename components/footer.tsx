export function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-muted-foreground">
      <p>
        © 2025 Haejun Kim. This work is licensed under{' '}
        <a 
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/" 
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          suppressHydrationWarning
        >
          CC BY NC ND 4.0
        </a>
      </p>
    </footer>
  )
}

export default Footer