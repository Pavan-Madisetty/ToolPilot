# Developer Module Technical Specification

**Version:** 1.0.0  
**Status:** Approved  
**Date:** 2026-07-08  
**Author:** Technical Architecture & Product Team

---

## 1. Module Overview

The Developer Module provides high-performance, client-side developer utilities including formatters, encoders, cryptographic hashers, and data generators. All logic compiles and executes strictly inside the client browser.

---

## 2. Module Specifications (PRD/SRS)

### 2.1 Component Folder Structure
```
src/pages/tools/developer/
├── JsonFormatter.tsx       # JSON Formatter & Validator
├── Base64Tool.tsx          # Base64 Encoder/Decoder
├── UuidGenerator.tsx       # v1 & v4 UUID Generator
├── HashGenerator.tsx       # Crypto MD5/SHA Hash Compiler
├── RegexTester.tsx         # Regular Expression Validator
├── PasswordGenerator.tsx   # Password/Passphrase Generator
├── JwtDecoder.tsx          # JSON Web Token Decoder
├── TimestampConverter.tsx  # Epoch Date Converter
└── placeholders/           # Sub-module shells (SQL, Lorem, etc.)
```

### 2.2 Shared Utilities & Core Web APIs
1. **Web Cryptography API:** Used for secure cryptographic hashing (SHA-256, SHA-512) and cryptographically strong password generation (`window.crypto.getRandomValues`).
2. **TextEncoder / TextDecoder:** Standard APIs for converting between JS strings and array buffers for binary encoding.
3. **Blob & URL.createObjectURL:** Enables on-the-fly downloadable file exports (.json, .txt).

---

## 3. Tool Specifications

### 3.1 JSON Formatter & Validator

#### Business Objective
Allow software engineers to format, validate, minify, and fix malformed JSON documents.

#### Processing Steps
1. **Fuzzy Fixes:** Automatically fix common syntax errors (e.g. single quotes to double quotes, missing double quotes around keys, trailing commas).
2. **Validation:** Try to parse using `JSON.parse`. If it fails, catch the syntax error, retrieve the line/character index, and render error details.
3. **Formatting:** Stringify using `JSON.stringify(obj, null, indent)` where indent is either spaces or tabs.
4. **Key Sorting:** Sort keys recursively before formatting.

---

### 3.2 Base64 Tool

#### Business Objective
Encode and decode strings or file uploads to/from Base64 format (with URL-safe variant toggle).

#### Mathematical Formulas
Base64 uses a 64-character set (`A-Z`, `a-z`, `0-9`, `+`, `/`).
- **URL-Safe Base64:** Replaces `+` with `-` and `/` with `_`, and trims trailing padding `=` signs.

---

### 3.3 UUID Generator

#### Business Objective
Bulk generate cryptographically secure Version 4 (random) and Version 1 (time-based) UUIDs.

#### Cryptographic Source
Uses `crypto.randomUUID()` where available, falling back to a secure pseudo-random number generator utilizing `crypto.getRandomValues()`.

---

### 3.4 Hash Generator

#### Business Objective
Compute MD5, SHA-1, SHA-256, and SHA-512 checksum hashes for text parameters and upload files.

#### Core Cryptography
Uses the browser's built-in `SubtleCrypto.digest()` Web API:
- MD5 uses a standard RFC 1321 JS implementation since it is not natively supported by Web Crypto Subtle.
- SHA-256, SHA-512 are natively computed asynchronously on worker threads.

---

### 3.5 Password Generator

#### Business Objective
Generate highly secure random passwords or dictionary-based passphrases.

#### Strength Meter
Calculates entropy ($E$):
$$E = L \cdot \log_2(R)$$
Where:
- $L$ = Password length
- $R$ = Pool size of characters (e.g., lowercase + uppercase + digits + symbols = 26 + 26 + 10 + 33 = 95)
- **Thresholds:** Weak ($E < 60$), Fair ($60 \le E < 80$), Strong ($80 \le E < 100$), Very Strong ($E \ge 100$).

---

### 3.6 JWT Decoder

#### Business Objective
Decode JSON Web Tokens (JWT) to inspect header details, claim payloads, and verify expiration deadlines.

#### Expiry Logic
Inspects the `exp` payload claim (Unix epoch seconds) against the current clock time:
$$\text{Time Left} = \text{Claims.exp} - \text{Date.now()} / 1000$$

---

## 4. Accessibility (WCAG 2.1 AA)
1. **Interactive Textareas:** Inputs include `aria-label` tags, and output codeboxes use `<pre>` and `code` containers with keyboard copy controls.
2. **Alerts:** Validation failures are declared via `role="alert"` boxes.

---

## 5. SEO & Metadata Plan
Every tool is registered with canonical URLs, OpenGraph metadata, and structured JSON-LD schema (type: `WebApplication`).
- **Sitemap URLs:** `/developer/json-formatter`, `/developer/base64`, `/developer/uuid-generator`, `/developer/hash-generator`, `/developer/password-generator`, `/developer/jwt-decoder`, `/developer/timestamp-converter`, `/developer/regex-tester`.
