#include <iostream>

int main() {
    char choice;

    std::cout << "Are you sure you want to continue? (y/n): ";
    std::cin >> choice;

    if (choice == 'y' || choice == 'Y') {
        std::cout << "Confirmed! Proceeding...\n";
    } else {
        std::cout << "Action canceled!\n";
    }

    return 0;
}
