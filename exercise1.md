After some searching for the tools for linting, testing and building for the
rust programming language i found the following:
    - For linting rust-clippy (https://github.com/rust-lang/rust-clippy) is
    the go-to tool
    - For testing Rust itself provides a robust testing system. For
    specialised use cases it provides a system to use custom testing and
    there are various small to medium sized testing frameworks
    - For Building Cargo, rust's own package manager is the defacto build
    tool and there are various extensions available for it. There are also
    options for Cmake and github actions(rust-action).

Additional tools to consider for CI purposes are:
    - Gitlab CI, good alternative with some traction lately
    - Buddy, it is mainly aimed at web developers
    - TeamCity, from the well known Jetbrains company
    - Big Eval, a data oriented framework
    - GoCD, the open source alternative

As for the question of where to host our CI solution, taking in consideration
the size of the team and language of the project, i believe a cloud solution
would be a better fit over self-hosting. Recommended solutions are:
    - Github actions, using rust-action or building our own
    - Gitlab CI is a valid and good or better alternative
    - builds.sr.ht if we want to take a newer and more experimental route
