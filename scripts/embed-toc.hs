#!/usr/bin/env runhaskell

{-# LANGUAGE OverloadedStrings #-}

import Data.Attoparsec.Text
import Data.Monoid
import qualified Data.Text as T
import qualified Data.Text.IO as T


htmlFiles :: [FilePath]
htmlFiles = [ "about.html"
            , "acknowledgements.html"
            , "bugfinder.html"
            , "chap1.html"
            , "chap2.html"
            , "chap3.html"
            , "chap4.html"
            , "chap5.html"
            , "exercises_and_problems.html"
            , "faq.html"
            , "index.html"
            , "supporters.html"
            , "translators.html"]


main :: IO ()
main = do
  tocContent <- T.readFile "scripts/toc.html"
  mapM_ (process tocContent) htmlFiles

process :: T.Text -> FilePath -> IO ()
process toc fn = do
  con <- T.readFile fn
  case parseOnly splitAtTOC con of
    Left msg -> putStrLn $ "cannot find TOC for file " ++ fn ++ " : " ++ msg
    Right (b,a) -> do
      T.writeFile fn $ b <> toc <> a

splitAtTOC :: Parser (T.Text, T.Text)
splitAtTOC = do
  a <- manyTill anyChar (try parseTOC)
  b <- manyTill anyChar endOfInput
  return (T.pack a,T.pack b)

parseTOC :: Parser T.Text
parseTOC = do
  string "<div id=\"toc\">"
  fmap T.pack $ manyTill anyChar endOfTOC

endOfTOC :: Parser ()
endOfTOC = do
  string "<a href=\"http://michaelnielsen.org\">Michael Nielsen</a>"
  manyTill anyChar endOfLine
  skipSpace
  string "</p>"
  skipSpace
  string "</div>"
  skipSpace
  return ()
